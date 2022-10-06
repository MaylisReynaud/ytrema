const express = require('express');

// Controller import
const projectController = require('../controller/projectController');

const router = express.Router();

// router.post('/member/:userId(\\d+)', projectController.create);
// router.get('/all/member/:userId(\\d+)', projectController.findAll);
router.get('/:projectId(\\d+)/member/:userId(\\d+)', projectController.findById);

module.exports = router;

