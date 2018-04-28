module.exports = (sequelize, DataTypes) => {
    return sequelize.define("entries", {
        description: DataTypes.STRING,
        time: DataTypes.TIME,
        date: DataTypes.DATE
    });
}