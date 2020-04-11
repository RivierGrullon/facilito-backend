
const sqlite3 = require('sqlite3');

const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const Sequelize = require('sequelize');

const session = require('express-session');

const findUserMiddleware = require('./middlewares/find_user');

const authUserMiddleware = require('./middlewares/auth_user');

const socketio = require('socket.io');

const taskRoutes = require('./routes/tasks_routes');
const RegistrationRoutes = require('./routes/registrations_routes');
const SessionsRoutes = require('./routes/sessions_route');
const categoriesRoutes = require('./routes/categories_routes');

const methodOverride = require('method-override');
//middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  }))
app.use(findUserMiddleware);
app.use(authUserMiddleware);

  //routes
app.use(taskRoutes);
app.use(RegistrationRoutes);
app.use(SessionsRoutes);
app.use(categoriesRoutes);
app.get('/', function(req, res){
    res.render('home',{user: req.user})
})


let server = app.listen(3000);

let io = socketio(server);

let userCount = 0;

let socket = {};

io.on('connection',function(sockets){

  let userId = sockets.request._query.loggeduser;
  if(userId)  socket[userId] = sockets;

  userCount++;
  io.emit('count_updated',{
    count:userCount
  });
  console.log(socket)
  sockets.on('new_task',function(data){
    if(data.userId){
      let userSocket  = socket[data.userId];
      if(!userSocket) return;
      userSocket.emit('new_task',data)
    }
  });

  sockets.on('disconnect',function(){
    Object.keys(socket).forEach(userId=>{
      let s = socket[userId]
      if(s.id == socket.id){
        socket[userId] = null
      }
    })
    userCount--;
    io.emit('count_updated',{
      count:userCount
    });
  })
});

const client = require('./realtime/client');