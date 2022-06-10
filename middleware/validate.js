const { status } = require('../common/constant');
const { responseService } = require('../util/response.services');

module.exports.validate = (schema, property) => (req, res, next) => {
	const { error } = schema.validate(req[property]);
	if (error) {
		const { details } = error;
		const message = details.map((i) => i.message).join(',');
		return responseService(res, status.BAD_INPUT, message);
	} else {
		next();
	}
};
