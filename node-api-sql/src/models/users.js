const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    return sequelize.define("User", {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        nombre: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },
        created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    }, {
        tableName: "usuarios",
        timestamps: false,
    });
}