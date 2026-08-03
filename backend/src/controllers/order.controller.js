const orderService = require('../services/order.service');
const sseManager = require('../utils/SseManager');

class OrderController {
    constructor(service, sse) {
        this.service = service;
        this.sse = sse;
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

    getOrder = async (req, res, next) => {
        try {
            const order = await this.service.getOrderDetails(req.params.id);
            res.status(200).json({ status: 'success', data: order });
        } catch (error) {
            next(error);
        }
    };

    updateStatusSimulation = async (req, res, next) => {
        try {
            const order = await this.service.updateOrderStatusAndNotify(
                req.params.id,
                req.body.status
            );
            res.status(200).json({ status: 'success', data: order });
        } catch (error) {
            next(error);
        }
    };

    // SSE Endpoint handler - Different HTTP headers
    trackOrderSSE = async (req, res, next) => {
        const { id } = req.params;

        // First verify order exists
        try {
            const order = await this.service.repo.getById(id);
            if (!order) throw ApiError.notFound('Order not found');

            // Set SSE Specific Headers
            res.writeHead(200, {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            });

            // Keep connection open and subscribe
            this.sse.subscribe(id, res);

            // Send initial heartbeat
            res.write(`data: ${JSON.stringify({ status: order.status })}\n\n`);

        } catch (error) {
            // Standard HTTP errors don't work for SSE after writeHead, 
            // but initial check is fine.
            next(error);
        }
    };
}

module.exports = new OrderController(orderService, sseManager);