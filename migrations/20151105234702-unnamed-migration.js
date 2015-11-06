'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'users',
      'neighborhood',
      Sequelize.STRING
    )
  },

  down: function (queryInterface, Sequelize) {
    return  queryInterface.removeColumn('users', 'neighborhood')
  }
};
