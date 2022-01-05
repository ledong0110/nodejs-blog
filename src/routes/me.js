const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

const meController = require('../app/controllers/MeController');

// newsController.index();
router.get('/stored/courses', meController.storedCourses);
router.get('/bin/courses', meController.binStored);

module.exports = router;
