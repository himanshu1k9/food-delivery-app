const orderRepository = require('../repositories/order.repository');
const menuRepository = require('../repositories/menu.repository');
const ApiError = require('../utils/ApiError');
const sseManager = require('../utils/SseManager');

class OrderService {
    constructor(repo, menuRepo, sse) {
        this.repo = repo;
        this.menuRepo = menuRepo;
        this.sse = sse;
    }

    async placeNewOrder(orderPayload) {
        const { items, ...deliveryDetails } = orderPayload;

        // Business Logic: Verify all menu items exist and calculate total
        let totalAmount = 0;
        const itemsWithPrice = [];

        for (const item of items) {
            const menuItem = await this.menuRepo.getById(item.menuId);
            if (!menuItem || !menuItem.isAvailable) {
                throw ApiError.notFound(`Menu item not found or unavailable: ${item.menuId}`);
            }

            const priceAtOrder = menuItem.price;
            itemsWithPrice.push({
                menuId: item.menuId,
                quantity: item.quantity,
                price: priceAtOrder, // Capture current price
            });

            totalAmount += priceAtOrder * item.quantity;
        }

        // Prepare final order data
        const orderData = {
            ...deliveryDetails,
            totalAmount: totalAmount.toFixed(2),
        };

        // Save with transactional integrity
        const savedOrder = await this.repo.createOrderWithItems(orderData, itemsWithPrice);

        return savedOrder;
    }

    async getOrderDetails(orderId) {
        const order = await this.repo.getByIdWithDetails(orderId);
        if (!order) throw ApiError.notFound('Order not found');
        return order;
    }

    async updateOrderStatusAndNotify(orderId, newStatus) {
        const order = await this.repo.getById(orderId);
        if (!order) throw ApiError.notFound('Order not found');

        // Persist change to DB
        const updatedOrder = await this.repo.updateStatus(orderId, newStatus);

        // Publish event to SSE Manager (Observer Pattern trigger)
        // Non-blocking call. We don't wait for subscribers to receive it.
        this.sse.publishStatusUpdate(orderId, newStatus);

        return updatedOrder;
    }
}

module.exports = new OrderService(orderRepository, menuRepository, sseManager);