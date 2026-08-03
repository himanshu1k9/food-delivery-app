const request = require('supertest');
const app = require('../../src/app');
const { Menu, sequelize } = require('../../src/models');

describe('Menu Integration Tests', () => {
    beforeAll(async () => {
        try {
            await sequelize.authenticate();
            // Match all model definitions cleanly
            await sequelize.sync({ force: true });
            await Menu.bulkCreate([
                {
                    name: 'Pizza',
                    description: 'Cheese Pizza',
                    price: 10.99,
                    imageURL: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
                },
                {
                    name: 'Burger',
                    description: 'Beef Burger',
                    price: 5.99,
                    imageURL: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'
                }
            ]);
        } catch (error) {
            console.error('Database connection/sync failed:', error);
            throw error;
        }
    });

    afterAll(async () => {
        await sequelize.close();
    });

    describe('GET /api/menu', () => {
        it('should return a list of available menu items', async () => {
            const res = await request(app).get('/api/menu');

            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.body.data)).toBeTruthy();
            expect(res.body.data.length).toEqual(2);
        });
    });
});