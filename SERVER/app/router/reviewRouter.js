const express = require('express');

// Controller import
const reviewController = require('../controller/reviewController');

const router = express.Router();

router.put('/member/:userId(\\d+)', reviewController.createOrUpdate);
router.get('/member/:userId(\\d+)', reviewController.findByUserId);
router.delete('/member/:userId(\\d+)', reviewController.delete);

module.exports = router;
