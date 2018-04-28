module.exports = (sequelize, DataTypes) => {
    return sequelize.define("teams", {
        name: DataTypes.STRING,
        category: DataTypes.STRING
    })
}