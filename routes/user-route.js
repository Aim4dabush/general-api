// 3rd party packages
const express = require('express');

// controllers
const userController = require('../controllers/user-controller');

// express router
const router = express.Router();

// shopping cart paths and controllers
router.get('/shopping-cart', userController.getUserShoppingCart);
router.post('/shopping-cart/:productId', userController.manageShoppingCartProduct);

// user paths and controllers
router.get('', userController.getUserProfile);
router.post('', userController.createNewUser);
router.patch('', userController.updateUserProfile);

// wish list paths and controllers
router.get('/wish-list', userController.getUserWishList);
router.post('/wish-list/:productId', userController.manageWishListProduct);

module.exports = router;