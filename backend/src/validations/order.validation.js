const Joi = require('joi');
const { OrderStatus } = require('../models/order.model');

const placeOrderSchema = Joi.object({
    customerName: Joi.string().required().trim(),
    deliveryAddress: Joi.string().required().trim(),
    phone: Joi.string().required().pattern(/^[0-9]{10}$/).messages({ 'string.pattern.base': 'Phone must be 10 digits' }),
    items: Joi.array().items(
        Joi.object({
            menuId: Joi.string().uuid().required(),
            quantity: Joi.number().integer().min(1).required(),
        })
    ).min(1).required(),
});

const updateOrderStatusSchema = Joi.object({
    status: Joi.string().valid(...Object.values(OrderStatus)).required(),
});

module.exports = { placeOrderSchema, updateOrderStatusSchema };