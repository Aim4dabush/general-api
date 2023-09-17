// 3rd party packages
const express = require('express');

// controllers
const productsController = require('../controllers/products-controller');

// express router
const router = express.Router();

// products paths and controllers
router.get('', productsController.getAllProducts);
router.get('/:productId', productsController.getProductById);

module.exports = router;