const request = require('supertest');
const app = require('../../src/app');
const { Menu, sequelize, Order, OrderItem } = require('../../src/models');
const { OrderStatus } = require('../../src/models/order.model');

describe('Order Status & Simulation Integration Tests', () => {
    let pizzaId;
    let seededOrderId;

    beforeAll(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });

        // Seed initial menu item
        const pizza = await Menu.create({
            name: 'Pizza',
            description: 'Cheese Pizza',
            price: 10.00,
            imageURL: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
        });
        pizzaId = pizza.id;

        // Seed initial order for GET and PUT status tests
        const seededOrder = await Order.create({
            customerName: 'Himanshu Kumar',
            deliveryAddress: 'Pune, Maharashtra',
            phone: '1234567890',
            totalAmount: 10.00
        });
        seededOrderId = seededOrder.id;
    });

    afterAll(async () => {
        await sequelize.close();
    });

    describe('POST /api/orders', () => {
        const getValidOrderPayload = () => ({
            customerName: 'Himanshu Kumar',
            deliveryAddress: 'Pune, Maharashtra',
            phone: '1234567890',
            items: [
                { menuId: pizzaId, quantity: 2 }
            ]
        });

        it('should place a valid order successfully (201)', async () => {
            const validOrder = getValidOrderPayload();

            const res = await request(app)
                .post('/api/orders')
                .send(validOrder);

            expect(res.statusCode).toEqual(201);
            expect(res.body.data).toHaveProperty('id');
            expect(res.body.data.status).toEqual('Order Received');
            expect(res.body.data.totalAmount).toEqual('20.00');

            const orderInDb = await Order.findByPk(res.body.data.id, {
                include: [{ model: OrderItem, as: 'items' }]
            });
            expect(orderInDb).toBeTruthy();
            expect(orderInDb.items.length).toBe(1);
        });

        it('should return 400 if validation fails (missing address)', async () => {
            const invalidOrder = { ...getValidOrderPayload(), deliveryAddress: '' };
            const res = await request(app).post('/api/orders').send(invalidOrder);
            expect(res.statusCode).toEqual(400);
        });

        it('should return 404 if item does not exist', async () => {
            const res = await request(app)
                .post('/api/orders')
                .send({
                    ...getValidOrderPayload(),
                    items: [{ menuId: '38a6a6f1-a18d-4a11-b0e9-b69512345678', quantity: 1 }]
                });
            expect(res.statusCode).toEqual(404);
        });
    });

    describe('GET /api/orders/:id', () => {
        it('should fetch order details (200)', async () => {
            const res = await request(app).get(`/api/orders/${seededOrderId}`);
            expect(res.statusCode).toBe(200);
            expect(res.body.data.id).toBe(seededOrderId);
        });

        it('should return 404 if order not found', async () => {
            const res = await request(app).get(`/api/orders/38a6a6f1-a18d-4a11-b0e9-b69512345678`);
            expect(res.statusCode).toBe(404);
        });
    });

    describe('PUT /api/orders/:id/status (Simulation)', () => {
        it('should update order status successfully (200)', async () => {
            const newStatus = OrderStatus.PREPARING;
            const res = await request(app)
                .put(`/api/orders/${seededOrderId}/status`)
                .send({ status: newStatus });

            expect(res.statusCode).toBe(200);
            expect(res.body.data.status).toBe(newStatus);
        });

        it('should return 400 for invalid status', async () => {
            const res = await request(app)
                .put(`/api/orders/${seededOrderId}/status`)
                .send({ status: 'INVALID STATUS' });
            expect(res.statusCode).toBe(400);
        });
    });
});