const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

router.post('/book', roomController.bookRoom);
router.get('/', roomController.getRoom);

module.exports = router;