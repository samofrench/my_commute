'use strict';

var bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    email: {
     type: DataTypes.STRING,
     validate: {
      isEmail: true,
      notEmpty: true
     }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [8, 99]
      }
    },
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      authenticate: function(email, password, callback) {
        this.find({
          where: {
            email: email
          }
        }).then(function (user) {
          if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
              if (err) {
                callback(err);
              } else {
                callback(null, result ? user : false);
              }
            });
          } else {
            callback(null, false);
          }
        }).catch(callback);
      }
    },
    instanceMethods: {
      checkPassword: function (password, callback) {
        if (password && this.password) {
          bcrypt.compare(password, this.password, callback);
        } else {
          callback(null, false);
        }
      }
    },
    hooks : {
      beforeCreate: function (user, options, callback) {
        if (!user.password) return callback(null, user);
        bcrypt.hash(user.password, 10, function (err, hash) {
          if (err) return callback(err);
          callback(null, user);
        });
      }
    }
  });
  return user;
};























