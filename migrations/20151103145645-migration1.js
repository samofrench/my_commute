'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'users',
      'car_want',
      Sequelize.BOOLEAN
    ).then(function () {
      queryInterface.addColumn(
        'users',
        'car_have',
        Sequelize.BOOLEAN
      ).then(function () {
        queryInterface.addColumn(
          'users',
          'pt_want',
          Sequelize.BOOLEAN
        ).then(function () {
          queryInterface.addColumn(
            'users',
            'bicycle_want',
            Sequelize.BOOLEAN
          ).then(function () {
            queryInterface.addColumn(
              'users',
              'bicycle_have',
              Sequelize.BOOLEAN
            ).then(function () {
              queryInterface.addColumn(
                'users',
                'walk_want',
                Sequelize.BOOLEAN
              )
            });
          });
        });
      });
    });
  },

  down: function (queryInterface, Sequelize) {
    return  queryInterface.removeColumn('users', 'car_want').then(function () {
              queryInterface.removeColumn('users', 'car_have').then(function () {
                queryInterface.removeColumn('users', 'pt_want').then(function() {
                  queryInterface.removeColumn('users', 'bicycle_want').then(function () {
                    queryInterface.removeColumn('users', 'bicycle_have').then(function () {
                      queryInterface.removeColumn('users', 'walk_want')
                    });
                  });
                });
              });
            });
  }
};
