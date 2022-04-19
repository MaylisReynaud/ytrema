const express = require('express');

// Controller import
const fabricController = require('../controller/fabricController');

const router = express.Router();

router.post('/member/:userId(\\d+)', fabricController.create);
router.get('/all/member/:userId(\\d+)', fabricController.findAll);
router.get('/:fabricId(\\d+)/member/:userId(\\d+)', fabricController.findById);
router.patch('/:fabricId(\\d+)/member/:userId(\\d+)', fabricController.update);
router.delete('/:fabricId(\\d+)/member/:userId(\\d+)', fabricController.delete);

module.exports = router;
