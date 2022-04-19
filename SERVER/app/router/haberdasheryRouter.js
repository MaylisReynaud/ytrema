const express = require('express');

// Controller import
const haberdasheryController = require('../controller/haberdasheryController');

const router = express.Router();

router.post('/member/:userId(\\d+)', haberdasheryController.create);
router.get('/all/member/:userId(\\d+)', haberdasheryController.findAll);
router.get('/:haberdasheryId(\\d+)/member/:userId(\\d+)', haberdasheryController.findById);
router.patch('/:haberdasheryId(\\d+)/member/:userId(\\d+)', haberdasheryController.update);
router.delete('/:haberdasheryId(\\d+)/member/:userId(\\d+)', haberdasheryController.delete);

module.exports = router;