const Joi = require('joi');

const createMovieValidation = {
	body: Joi.object({
		title: Joi.string().required(),
		description: Joi.string().required(),
		cast: Joi.array().required()
	}),
};
const getMoviesValidation = {
	body: Joi.object({
		search: Joi.string().allow('').allow(null).optional()
	}),
	query: Joi.object({
		page: Joi.number().positive().required(),
		perPage: Joi.number().positive().required(),
	}),
};

module.exports = { createMovieValidation, getMoviesValidation };
