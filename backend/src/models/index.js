const { sequelize } = require('../config/db.config');
const Menu = require('./menu.model');
const { Order, OrderStatus } = require('./order.model');
const OrderItem = require('./orderItem.model');


// Defining Relationships between the tables
Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items', onDelete: 'CASCAADE' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Menu.hasMany(OrderItem, { foreignKey: 'menuId' });
OrderItem.belongsTo(Menu, { foreignKey: 'menuId', as: 'menuDetails' });


module.exports = {
    sequelize,
    Menu,
    Order,
    OrderItem,
    OrderStatus,
};