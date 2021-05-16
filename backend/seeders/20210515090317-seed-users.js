'use strict';

const faker = require("faker");
const bcrypt = require('bcrypt');

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
            let hash = bcrypt.hashSync(faker.internet.password(), 10);
            // Store hash in your password DB.
            data.push({ fname: faker.name.firstName(), lname: faker.name.lastName(), email: faker.internet.email(), password: hash, teamId: (Math.floor(Math.random() * 10) + 1), createdAt: new Date(), updatedAt: new Date() })

        }
        console.log(data)
        await queryInterface.bulkInsert("Users", data);
    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Users', null, {});
    }
};