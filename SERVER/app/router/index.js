const express = require('express');

// Controller import
const authController = require('../controller/authController');
const errorController = require('../controller/errorController');
const { findAll: findAllReviews } = require('../controller/reviewController');

// Router import
const memberRouter = require('./memberRouter');
const fabricRouter = require('./fabricRouter');
const haberdasheryRouter = require('./haberdasheryRouter');
const patternRouter = require('./patternRouter');
const reviewRouter = require('./reviewRouter.js');
const projectRouter = require('./projectRouter.js');
const photoRouter = require('./photoRouter.js');

// Middleware import
const auth = require('../middleware/auth');
const checkMember = require('../middleware/checkMember');

const router = express.Router();

// Get all reviews from home
router.get('/', findAllReviews);

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
router.use('/project', projectRouter);
// pattern router
router.use('/pattern', patternRouter);
// photo router
router.use('/photo', photoRouter);

// handleError
router.use(errorController.error404);
router.use(errorController.error500);

module.exports = router;