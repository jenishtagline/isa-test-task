const { Schema, model } = require('mongoose');
const { collectionsName } = require('../common/constant');

const movieSchema = Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		cast: {
			type: Array,
			required: true,
		},
	},
	{ timestamp: true }
);

module.exports.moviesModel = model(
	collectionsName.MOVIES,
	movieSchema,
	collectionsName.MOVIES
);
