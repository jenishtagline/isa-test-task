const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { responseService } = require('../util/response.services');
const { SALT_ROUNDS, status } = require('./constant');

const encryptPassword = async (password) => {
	return await bcrypt.hash(password, SALT_ROUNDS);
};

const comparePassword = async (newPassword, oldPassword) => {
	return await bcrypt.compare(newPassword, oldPassword);
};

const generateToken = (payload, expiresIn = '1 day') => {
	return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn });
};

module.exports = {
	encryptPassword,
	comparePassword,
	generateToken,
};
