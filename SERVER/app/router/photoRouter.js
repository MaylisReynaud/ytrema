const express = require('express');

// Controller import
const photoController = require('../controller/photoController');

const router = express.Router();

router.post('/project/:projectId(\\d+)/member/:userId(\\d+)', photoController.create);
router.get('/all/project/:projectId(\\d+)/member/:userId(\\d+)', photoController.findAll);
router.get('/:photoId(\\d+)/project/:projectId(\\d+)/member/:userId(\\d+)', photoController.findById);
router.patch('/:photoId(\\d+)/project/:projectId(\\d+)/member/:userId(\\d+)', photoController.update);
router.delete('/:photoId(\\d+)/project/:projectId(\\d+)/member/:userId(\\d+)', photoController.delete);


module.exports = router;

