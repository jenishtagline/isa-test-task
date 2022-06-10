const { statusCode, responseMessages } = require('../common/constant');

const responseService = (
	res,
	status,
	message = responseMessages.INTERNAL_SERVER_ERROR,
	data = []
) => {
	return res.status(statusCode[status]).json({ message, data });
};

module.exports = { responseService };
