const express = require('express');

// Controller import
const authController = require('../controller/authController');
const errorController = require('../controller/errorController');

// Router import

// Middleware import
const auth = require('../middleware/auth');

const router = express.Router();

// auth router
router.post('/login', authController.handleLoginForm);
router.post('/signup', authController.handleSignForm);

router.use(auth);

// member router
// haberdashery router
// review router
// fabric router
// project router
// pattern router
// photo router


// handleError
router.use(errorController.error404);
router.use(errorController.error500);

// console.log('Hi ! The server is connected');

module.exports = router;