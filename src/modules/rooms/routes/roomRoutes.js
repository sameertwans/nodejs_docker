const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

router.post('/book', roomController.bookRoom.bind(roomController));
router.get('/', roomController.getRooms.bind(roomController));

module.exports = router;