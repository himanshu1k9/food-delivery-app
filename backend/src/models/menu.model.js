const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.config');

const Menu = sequelize.define('menu', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true }
    },
    description: {
        type: DataTypes.TEXT
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: { min: 0.01 }
    },
    imageURL: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isUrl: true }
    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
}, {
    timestamps: true,
});

module.exports = Menu;