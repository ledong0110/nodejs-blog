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
router.get('/login_setting', siteController.login_setting);
router.get('/logout_setting', siteController.logout_setting);

module.exports = router;
