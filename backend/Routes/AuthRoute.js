const { signup,login } = require('../Controllers/AuthController');
const { loginValidation, signupValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router();

router.post('/signup',signupValidation,signup);  // mtlb singupvalidate hogya hoga tab hi, signup function login call hoga

router.post('/login',loginValidation,login);


module.exports = router;