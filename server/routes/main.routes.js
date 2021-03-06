const express = require('express');
const router = express.Router();
const alertController = require('../controllers/Alert.controller');

router.get('/', alertController.getAlerts);
router.post('/', alertController.createAlert);
router.get('/:id', alertController.getAlert);
router.put('/:id', alertController.editAlert);
router.delete('/:id', alertController.deleteAlert);




module.exports = router;