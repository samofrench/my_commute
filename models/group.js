'use strict';
module.exports = function(sequelize, DataTypes) {
  var group = sequelize.define('group', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.group.belongsTo(models.user);
      }
    }
  });
  return group;
};