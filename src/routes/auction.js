const express = require('express');
const router = express.Router();
const auctionController = require('../app/controllers/AuctionController');
const authMiddleware = require('../app/middlewares/AuthMiddleware');

router.post('/store', authMiddleware.requireAuth, auctionController.store);

module.exports = router;