const express = require('express');
const userController = require('../controllers/userController');
const validateJWT = require('../middlewares/validateJWT');

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', validateJWT, userController.findAll);
router.get('/:id', validateJWT, userController.findById);
router.delete('/me', validateJWT, userController.deleteUser);

module.exports = router;