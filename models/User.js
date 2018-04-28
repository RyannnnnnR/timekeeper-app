module.exports = (sequelize, DataTypes) => {
    return sequelize.define("users", {
        fname: DataTypes.STRING,
        lname: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    });
}