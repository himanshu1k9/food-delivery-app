const express = require('express');
const orderController = require('../controllers/order.controller');
const validate = require('../middlewares/validate.middleware');
const { placeOrderSchema, updateOrderStatusSchema } = require('../validations/order.validation');

const router = express.Router();

router.post('/', validate(placeOrderSchema), orderController.createOrder);
router.get('/:id', orderController.getOrder);
router.get('/:id/track', orderController.trackOrderSSE);
router.put('/:id/status', validate(updateOrderStatusSchema), orderController.updateStatusSimulation);

module.exports = router;