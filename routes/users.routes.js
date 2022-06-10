const express = require('express');
const router = express.Router();
const { validate } = require('../middleware/validate');
const { signup, login } = require('../controllers/users.controller');
const {
	signupValidation,
	loginValidation,
} = require('../validation/users.validation');

router.post('/signup', validate(signupValidation.body, 'body'), signup);
router.post('/login', validate(loginValidation.body, 'body'), login);

module.exports = router;
