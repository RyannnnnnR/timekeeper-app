'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Entry, {
        foreignKey: 'entryId',
        as: 'entries',
    });
    User.hasMany(models.Team, {
        foreignKey: 'teamId',
        as: 'teams',
    });
    User.hasOne(models.Role);
  };
  return User;
};