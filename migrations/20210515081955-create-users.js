'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            fname: {
                type: Sequelize.STRING
            },
            lname: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            username: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            role: {
                type: Sequelize.STRING
            },
            teamId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Teams",
                    key: "id",
                    as: 'teamId'
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable('Users');
    }
};