const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.config');

// Definig the order statuses
const OrderStatus = {
    RECEIVED: 'Order Received',
    PREPARING: 'Preparing',
    OUT_FOR_DELIVERY: 'Out for Delivery',
    DELIVERED: 'Delivered',
    CANCELLED: 'Cancelled',
}

const Order = sequelize.define('order', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    customerName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    deliveryAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
    },
    status: {
        type: DataTypes.ENUM(Object.values(OrderStatus)),
        defaultValue: OrderStatus.RECEIVED,
        allowNull: false,
    },
}, {
    timestamps: true,
});

module.exports = { Order };