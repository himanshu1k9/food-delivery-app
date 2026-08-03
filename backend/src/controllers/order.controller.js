const orderService = require('../services/order.service');

class OrderController {
    constructor(service) {
        this.service = service;
    }

    createOrder = async (req, res, next) => {
        try {
            // Input is already validated and sanitized by middleware
            const order = await this.service.placeNewOrder(req.body);
            res.status(201).json({
                status: 'success',
                data: order,
            });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new OrderController(orderService);