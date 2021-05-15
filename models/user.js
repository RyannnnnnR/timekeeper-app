'use strict';

const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasOne(models.AuthToken, { foreignkey: "authTokenId" });
            User.hasMany(models.Entry, { foreignkey: "entryId" });
            User.belongsTo(models.Team, { foreignKey: "teamId" });
        }
    }
    User.init({
        fname: DataTypes.STRING,
        lname: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        teamId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};