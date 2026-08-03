const { Order, OrderItem, Menu, sequelize } = require('../models');

class OrderRepository {
    constructor() {
        this.orderModel = Order;
        this.orderItemModel = OrderItem;
        this.menuModel = Menu;
    }

    // Uses a managed Transaction for atomicity 
    async createOrderWithItems(orderData, itemsWithPrice) {
        return sequelize.transaction(async (t) => {
            // Create Order header
            const order = await this.orderModel.create(orderData, { transaction: t });

            // Prepare items with OrderId
            const itemsToInsert = itemsWithPrice.map(item => ({
                ...item,
                orderId: order.id,
            }));

            // Bulk insert Order Items
            await this.orderItemModel.bulkCreate(itemsToInsert, { transaction: t });

            return order;
        });
    }

    async getById(id) {
        return this.orderModel.findByPk(id);
    }

    async getByIdWithDetails(id) {
        return this.orderModel.findByPk(id, {
            include: [{
                model: OrderItem,
                as: 'items',
                include: [{ model: Menu, as: 'menuDetails' }]
            }]
        });
    }

    // Standard Sequelize update returning the updated instance
    async updateStatus(id, status) {
        const order = await this.orderModel.findByPk(id);
        if (!order) return null;

        order.status = status;
        await order.save();
        return order;
    }
}

module.exports = new OrderRepository();