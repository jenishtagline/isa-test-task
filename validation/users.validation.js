const Joi = require('joi');

const signupValidation = {
	body: Joi.object({
		name: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string()
			.regex(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,16}$/)
			.required(),
		role: Joi.string().required(),
	}),
};
const loginValidation = {
	body: Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required(),
	}),
};

module.exports = { signupValidation, loginValidation };
