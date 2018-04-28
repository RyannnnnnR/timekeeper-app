'use strict';
module.exports = (sequelize, DataTypes) => {
    var Entry = sequelize.define('Entry', {
        description: DataTypes.STRING,
        timeAdded: DataTypes.TIME,
        teamId: DataTypes.INTEGER,
        dateAdded: DataTypes.DATE
    }, {});
    return Entry;
};