const express = require('express');

// Controller import
const projectController = require('../controller/projectController');

const router = express.Router();

router.post('/member/:userId(\\d+)', projectController.create);
router.get('/all/member/:userId(\\d+)', projectController.findAll);
router.get('/:projectId(\\d+)/member/:userId(\\d+)', projectController.findById);
router.patch('/:projectId(\\d+)/member/:userId(\\d+)', projectController.update);

// UPDATE FABRIC AND HABERDASHERY IN A PROJECT
router.patch('/:projectId(\\d+)/fabric/:fabricId(\\d+)/member/:userId(\\d+)', projectController.updateFabricUsed);
router.patch('/:projectId(\\d+)/haberdashery/:haberdasheryId(\\d+)/member/:userId(\\d+)', projectController.updateHaberdasheryUsed);

router.delete('/all/member/:userId(\\d+)', projectController.deleteAll);
router.delete('/:projectId(\\d+)/member/:userId(\\d+)', projectController.delete);


module.exports = router;

