const express = require('express');

// Controller import
const projectController = require('../controller/projectController');

const router = express.Router();

router.post('/member/:userId(\\d+)', projectController.create);

// ADD NEW FABRIC AND HABERDASHERY IN A PROJECT
router.post('/:projectId(\\d+)/add/fabric/member/:userId(\\d+)', projectController.addFabric);
router.post('/:projectId(\\d+)/add/haberdashery/member/:userId(\\d+)', projectController.addHaberdashery);
router.post('/:projectId(\\d+)/add/pattern/member/:userId(\\d+)', projectController.addPattern);

router.get('/all/member/:userId(\\d+)', projectController.findAll);
router.get('/:projectId(\\d+)/member/:userId(\\d+)', projectController.findById);
router.patch('/:projectId(\\d+)/member/:userId(\\d+)', projectController.update);

// UPDATE FABRIC AND HABERDASHERY IN A PROJECT
router.patch('/:projectId(\\d+)/fabric/:fabricId(\\d+)/member/:userId(\\d+)', projectController.updateFabricUsed);
router.patch('/:projectId(\\d+)/haberdashery/:haberdasheryId(\\d+)/member/:userId(\\d+)', projectController.updateHaberdasheryUsed);

router.delete('/all/member/:userId(\\d+)', projectController.deleteAll);
router.delete('/:projectId(\\d+)/member/:userId(\\d+)', projectController.delete);


module.exports = router;

