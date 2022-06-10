const {
	encryptPassword,
	generateToken,
	comparePassword,
} = require('../common/commonFn');
const { responseMessages, status } = require('../common/constant');
const { userModel } = require('../model/users.model');
const { responseService } = require('../util/response.services');

const signup = async (req, res) => {
	try {
		const { name, email, password, role } = req.body;

		const isEmailExist = await userModel.findOne({ email });
		if (isEmailExist)
			return responseService(
				res,
				status.BAD_INPUT,
				responseMessages.EMAIL_ALREADY_EXIST
			);

		const hashPassword = await encryptPassword(password);
		const userData = await userModel.create({
			email,
			name,
			password: hashPassword,
			role: role.toUpperCase(),
		});
		return responseService(res, status.OK, responseMessages.USER_SIGNUP, { email: userData.email, role: userData.role, name: userData.name });
	} catch (err) {
		console.log('err :>> ', err);
		return responseService(res, status.INTERNAL_SERVER_ERROR);
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const userData = await userModel.findOne({ email });

		if (!userData)
			return responseService(
				res,
				status.BAD_INPUT,
				responseMessages.USER_NOT_FOUND
			);

		const isSamePassword = comparePassword(password, userData.password);
		if (!isSamePassword)
			return responseService(
				res,
				status.BAD_INPUT,
				responseMessages.INVALID_PASSWORD
			);

		const accessToken = generateToken({
			email: userData.email,
			id: userData._id,
			role: userData.role,
		});

		return responseService(res, status.OK, responseMessages.LOGIN_SUCCESS, {
			email,
			id: userData._id,
			role: userData.role,
			token: accessToken,
		});
	} catch (err) {
		console.log('err :>> ', err);
		return responseService(res, status.INTERNAL_SERVER_ERROR);
	}
};

module.exports = { signup, login };
