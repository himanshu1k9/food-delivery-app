const request = require('supertest');
const app = require('../../src/app');
const { Menu, sequelize, Order, OrderItem } = require('../../src/models');

describe('Order Integration Test', () => {
    let pizzaId;

    beforeAll(async () => {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });

        const pizza = await Menu.create({
            name: 'Pizza',
            description: 'Cheese Pizza',
            price: 10.00,
            imageURL: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
        });
        pizzaId = pizza.id;
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
});