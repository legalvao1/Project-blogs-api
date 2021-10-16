const express = require('express');
const postController = require('../controllers/postController');
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.post('/', validateJWT, postController.createPost);
router.get('/', validateJWT, postController.getPosts);
router.get('/search', validateJWT, postController.getPostBySearchParams);
router.get('/:id', validateJWT, postController.getPostById);
router.put('/:id', validateJWT, postController.editPost);
router.delete('/:id', validateJWT, postController.deletePost);

module.exports = router;