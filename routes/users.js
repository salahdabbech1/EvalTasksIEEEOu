var express = require('express');
var router = express.Router();
const authController = require("../controllers/AuthController");
const verifyToken = require('../middlewares/verify-token');
const userValidation = require('../middlewares/user-validation');

router.post('/signup', userValidation.userValidationRules(), userValidation.validate, authController.signUp)
router.post('/signin', authController.signIn)
router.get('/user/current', verifyToken, authController.currentUser)
router.delete('/delete/:id', authController.deleteUser)
router.put('/user', userValidation.userValidationRules(), userValidation.validate, authController.updateUser)

module.exports = router;
