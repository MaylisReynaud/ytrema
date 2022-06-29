const express = require('express');

// Controller import
const authController = require('../controller/authController');
const errorController = require('../controller/errorController');

// Router import
const memberRouter = require('./memberRouter');
const fabricRouter = require('./fabricRouter');
const haberdasheryRouter = require('./haberdasheryRouter');
const reviewRouter = require('./reviewRouter.js');

// Middleware import
const auth = require('../middleware/auth');
const checkMember = require('../middleware/checkMember');

const router = express.Router();

// auth router
router.post('/login', authController.handleLoginForm);
router.post('/signup', authController.handleSignForm);

// secure router via middleware
router.use(auth);
router.use(checkMember);

// member router
router.use('/member', memberRouter);
// fabric router
router.use('/fabric', fabricRouter);
// haberdashery router
router.use('/haberdashery', haberdasheryRouter);
// review router
router.use('/review', reviewRouter);
// project router
// pattern router
// photo router


// handleError
router.use(errorController.error404);
router.use(errorController.error500);

module.exports = router;