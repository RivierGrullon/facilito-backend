'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type:DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password_hash: DataTypes.STRING,
    password: DataTypes.VIRTUAL
  }, {});

  User.login = function(email, password){
    return User.findOne({
      where:{
        email
      }
    }).then(user=>{
      if(!user) return null
      return user.authenticatePassword(password).then( valid=> valid ? user : null);
    });
  };

  User.prototype.authenticatePassword = function(password){
    return new Promise((res,rej)=>{
      bcrypt.compare(password, this.password_hash, (err, valid)=>{
        if(err) return rej(err);
        res(valid)
      });
    })
  };

  User.associate = function(models) {
    User.hasMany(models.Task,{
      as: "tasks"
    })
  };

  User.beforeCreate(function(user, options){
    return new Promise((res,rej)=>{
      if(user.password){
        bcrypt.hash(user.password, 10, function(error, hash){
          user.password_hash = hash;
          res();
        });
      };
    });

  });

  return User;
};