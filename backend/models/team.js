'use strict';

const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Team extends Model {
        static associate(models) {
            Team.hasOne(models.User, { foreignKey: "teamId" })
        }
    }
    Team.init({
        teamName: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Team',
    });
    return Team;
};