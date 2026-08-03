const express = require('express');
const orderController = require('../controllers/order.controller');
const validate = require('../middlewares/validate.middleware');
const { placeOrderSchema } = require('../validations/order.validation');

const router = express.Router();

router.post(
    '/',
    validate(placeOrderSchema), // Validate before handling
    orderController.createOrder
);

module.exports = router;