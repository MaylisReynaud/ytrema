const express = require('express');

// Controller import
const memberController = require('../controller/memberController');

const router = express.Router();

router.get('/:userId(\\d+)', memberController.findById);
router.patch('/:userId(\\d+)', memberController.update);
router.delete('/:userId(\\d+)', memberController.delete);

module.exports = router;
