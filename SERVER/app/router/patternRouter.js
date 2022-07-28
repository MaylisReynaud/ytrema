const express = require('express');

// Controller import
const patternController = require('../controller/patternController');

const router = express.Router();

router.post('/member/:userId(\\d+)', patternController.create);
router.get('/all/member/:userId(\\d+)', patternController.findAll);
router.get('/:patternId(\\d+)/member/:userId(\\d+)', patternController.findById);
router.patch('/:patternId(\\d+)/member/:userId(\\d+)', patternController.update);
router.delete('/all/member/:userId(\\d+)', patternController.deleteAll);
router.delete('/:patternId(\\d+)/member/:userId(\\d+)', patternController.delete);

module.exports = router;
