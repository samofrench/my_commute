'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
  return queryInterface.addColumn(
      'groups',
      'address1',
      Sequelize.STRING
    ).then(function () {
      queryInterface.addColumn(
        'groups',
        'address2',
        Sequelize.STRING
      ).then(function () {
        queryInterface.addColumn(
          'groups',
          'city',
          Sequelize.STRING
        ).then(function () {
          queryInterface.addColumn(
            'groups',
            'state',
            Sequelize.STRING
          ).then(function () {
            queryInterface.addColumn(
              'groups',
              'zip',
              Sequelize.INTEGER
            )
            });
          });
        });
      });
  },

  down: function (queryInterface, Sequelize) {
    return  queryInterface.removeColumn('groups', 'address1').then(function () {
              queryInterface.removeColumn('groups', 'address2').then(function () {
                queryInterface.removeColumn('groups', 'city').then(function() {
                  queryInterface.removeColumn('groups', 'state').then(function () {
                    queryInterface.removeColumn('groups', 'zip')
                  });
                });
              });
            });
  }
};
