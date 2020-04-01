
const sqlite3 = require('sqlite3');

const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const Sequelize = require('sequelize');

const taskRoutes = require('./routes/tasks_routes');

const methodOverride = require('method-override');
//middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

app.use(taskRoutes);



app.listen(3000);

