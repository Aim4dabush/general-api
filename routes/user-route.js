// 3rd party packages
const express = require('express');

// controllers
const userController = require('../controllers/user-controller');

// express router
const router = express.Router();

// order paths and controllers
router.delete('/orders/:orderId', userController.deleteOrder)
router.get('/orders', userController.getOrders);
router.post('/orders', userController.createOrder);

// shopping cart paths and controllers
router.get('/shopping-cart', userController.getUserShoppingCart);
router.post('/shopping-cart/:action', userController.manageShoppingCartProduct);

// user paths and controllers
router.get('', userController.getUserProfile);
router.patch('', userController.updateUserProfile);

// wish list paths and controllers
router.get('/wish-list', userController.getUserWishList);
router.post('/wish-list/:action', userController.manageWishListProduct);

module.exports = router;