
const sqlite3 = require('sqlite3');

const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const Sequelize = require('sequelize');

const session = require('express-session');

const findUserMiddleware = require('./middlewares/find_user');

const authUserMiddleware = require('./middlewares/auth_user');

const taskRoutes = require('./routes/tasks_routes');
const RegistrationRoutes = require('./routes/registrations_routes');
const SessionsRoutes = require('./routes/sessions_route');

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
app.get('/', function(req, res){
    res.render('home',{user: req.user})
})


app.listen(3000);

