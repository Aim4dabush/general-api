// 3rd party packages
const express = require('express');

// controllers
const orderController = require('../controllers/order-controller');

// express router
const router = express.Router();

// order paths and controllers
router.delete('/:orderId', orderController.deleteOrder)
router.get('/:userId', orderController.getOrders);
router.post('/create', orderController.createOrder);

module.exports = router;