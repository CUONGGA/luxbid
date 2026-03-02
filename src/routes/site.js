const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController.js');
const productController = require('../app/controllers/ProductController');
const authMiddleware = require('../app/middlewares/AuthMiddleware');


router.get('/:slug', siteController.show);

module.exports = router;