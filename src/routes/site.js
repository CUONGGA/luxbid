const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');
router.use('/', siteController.show);

module.exports = router;
