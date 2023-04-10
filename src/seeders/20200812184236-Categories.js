module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('categorys',
      [
        {
          id: 1,
          name: 'Inovação',
        },
        {
          id: 2,
          name: 'Escola',
        },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('categorys', null, {});
  },
};
