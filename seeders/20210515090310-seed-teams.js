'use strict';
const faker = require('faker');
module.exports = {
    up: async(queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        let data = []
        for (let i = 0; i <= 10; i++) {
            data.push({ teamName: faker.random.word(), createdAt: new Date(), updatedAt: new Date() })
        }
        console.log(data)
        await queryInterface.bulkInsert("Teams", data);
    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Teams', null, {});
    }
};