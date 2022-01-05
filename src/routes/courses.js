const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');
const courseController = require('../app/controllers/CourseController');

// newsController.index();
router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:id/edit', courseController.edit);
router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore);
router.get('/:slug', courseController.show);
router.delete('/:id', courseController.destroy);
router.delete('/:id/force', courseController.forceDestroy);

module.exports = router;
