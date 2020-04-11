'use strict';
const socket = require('../realtime/client');
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    description: DataTypes.TEXT
  }, {});
  Task.associate = function(models) {
    Task.belongsTo(models.User,{
      as: 'user'
    });
    Task.belongsToMany(models.Category, {
      through: 'TaskCategories',
      as: 'categories'
    })
  };
  Task.afterCreate(function(task,options){
    socket.emit('new_task', task)
  });


  return Task;
};