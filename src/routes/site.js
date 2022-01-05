const express = require('express');
const route = require('.');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');
const siteController = require('../app/controllers/SiteController');

// newsController.index();
router.get('/search', siteController.search);
router.get('/', siteController.home);
router.get('/profile', requiresAuth(), siteController.profile);
router.get('/login', requiresAuth(), siteController.login);

module.exports = router;
