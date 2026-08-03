const orderRepository = require('../repositories/order.repository');
const menuRepository = require('../repositories/menu.repository');
const ApiError = require('../utils/ApiError');

class OrderService {
    constructor(repo, menuRepo) {
        this.repo = repo;
        this.menuRepo = menuRepo;
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
}

module.exports = new OrderService(orderRepository, menuRepository);