const express = require('express');

const userController = require('../controllers/user-controller');

const router = express.Router();

// user paths and controllers
router.get('/:userId', userController.getUserProfile);
router.post('/new', userController.createNewUser);

module.exports = router;