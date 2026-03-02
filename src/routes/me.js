const express = require('express');
const router = express.Router();
const homeController = require('../app/controllers/HomeController');
const requireLogin = require('../app/middlewares/requireLogin');
const requireAdmin = require('../app/middlewares/requireAdmin');

router.get('/myproduct', requireLogin, requireAdmin, homeController.index);
module.exports = router;
