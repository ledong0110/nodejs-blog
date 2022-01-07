const express = require('express');
const route = require('.');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');
const siteController = require('../app/controllers/SiteController');

// newsController.index();
router.get('/search', siteController.search);
router.get('/', siteController.home);
router.get('/profile', siteController.profile);
router.get('/login', siteController.login);

module.exports = router;
