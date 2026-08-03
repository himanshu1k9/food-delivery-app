const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.config');

const OrderItem = sequelize.define('OrderItem', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1 },
    },
    price: { // Historical price at the time of order [ For the track price at the time of order ]
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    timestamps: false, // Not needed for junction table
});

module.exports = OrderItem;