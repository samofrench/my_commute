'use strict';
module.exports = function(sequelize, DataTypes) {
  var group = sequelize.define('group', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    address1: DataTypes.STRING,
    address2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
//        models.group.belongsTo(models.user);
        models.user.belongsToMany(models.group, {through: "usersGroups"});
      }
    }
  });
  return group;
};