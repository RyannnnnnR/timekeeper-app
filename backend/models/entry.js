'use strict';

const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Entry extends Model {
        static associate(models) {
            Entry.belongsTo(models.User, { foreignKey: "entryId" })
        }
    };
    Entry.init({
        description: DataTypes.STRING,
        timeAdded: DataTypes.TIME,
        userId: DataTypes.INTEGER,
        dateAdded: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Entry',
    });
    return Entry;
};