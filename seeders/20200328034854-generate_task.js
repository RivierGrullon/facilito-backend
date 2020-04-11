'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {


      return queryInterface.bulkInsert('tasks', [
        {
          id:1,
          description:'Tratar de que funcione esto',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id:2,
          description:'Viendo si funciona',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id:3,
          description:'Descripcion 3',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('tasks', null, {});

  }
};
