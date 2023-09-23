// 3rd party packages
const express = require('express');

// controllers
const userController = require('../controllers/user-controller');

// express router
const router = express.Router();

// login paths and controllers
router.post('/login', userController.loginUser);
router.post('/register', userController.createNewUser);

module.exports = router;