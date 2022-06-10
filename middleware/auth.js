const { userModel } = require('../model/users.model');
const { responseMessages, status } = require('../common/constant');
const { responseService } = require('../util/response.services');
const jwt = require('jsonwebtoken');

module.exports.Auth = (roles) => async (req, res, next) => {
	try {
		const token = req.headers['access-token'];

		if (!token) {
			return responseService(
				res,
				status.BAD_INPUT,
				responseMessages.TOKEN_NOT_FOUND
			);
		}

		const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

		if (!decodedToken)
			return responseService(
				res,
				status.UNAUTHORIZED,
				responseMessages.UNAUTHORIZED
			);

		if (!roles.includes(decodedToken.role)) {
			return responseService(
				res,
				status.UNAUTHORIZED,
				responseMessages.UNAUTHORIZED
			);
		}

		const userObject = await userModel.findOne({ email: decodedToken.email });

		if (!userObject)
			return responseService(
				res,
				status.BAD_INPUT,
				responseMessages.USER_NOT_FOUND
			);

		req.obj = decodedToken.email;
		next();
	} catch (error) {
		return responseService(
			res,
			status.UNAUTHORIZED,
			responseMessages.UNAUTHORIZED
		);
	}
};
