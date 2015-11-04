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
    name: DataTypes.STRING,
    car_want: DataTypes.BOOLEAN,
    car_have: DataTypes.BOOLEAN,
    pt_want: DataTypes.BOOLEAN,
    bicycle_want: DataTypes.BOOLEAN,
    bicycle_have: DataTypes.BOOLEAN,
    walk_want: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        models.user.hasMany(models.group);
      },
      authenticate: function(email, password, callback) {
        this.findOne({
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
          user.password = hash;
          callback(null, user);
        });
      }
    }
  });
  return user;
};

















