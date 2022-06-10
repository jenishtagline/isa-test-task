const {
	encryptPassword,
	generateToken,
	comparePassword,
} = require('../common/commonFn');
const axios = require('axios');
const { responseMessages, status } = require('../common/constant');
const { moviesModel } = require('../model/movies.model');
const { responseService } = require('../util/response.services');

module.exports.getAllMovies = async (req, res) => {
	try {
		const { search } = req.body;
		const { page, perPage } = req.query;

		const moviesList = await moviesModel.aggregate([
			{
				$match: {
					$or: [
						{ title: { $regex: `${search}`, $options: 'i' } },
						{ description: { $regex: `${search}`, $options: 'i' } },
						{ cast: { $regex: `${search}`, $options: 'i' } },
					],
				},
			},
			{
				$facet: {
					metadata: [
						{ $count: 'totalCount' },
						{ $addFields: { page: +page } },
						{ $addFields: { perPage: +perPage } },
					],
					data: [{ $skip: perPage * (page - 1) }, { $limit: +perPage }], // add projection here wish you re-shape the docs
				},
			},
			{
				$unwind: {
					path: '$metadata'
				}
			}
		]);

		return responseService(
			res,
			status.OK,
			responseMessages.GET_MOVIES,
			moviesList[0]
		);
	} catch (err) {
		console.log('err :>> ', err);
		return responseService(res, status.INTERNAL_SERVER_ERROR);
	}
};

module.exports.create = async (req, res) => {
	try {
		const { title, description, cast } = req.body;
		const movieCreated = await moviesModel.create({ title, description, cast });

		const slackToken = process.env.SLACK_TOKEN;
		const url = 'https://slack.com/api/chat.postMessage';

		await axios.post(
			url,
			{
				channel: `#${process.env.SLACK_CHANNEL}`,
				text: `Movie ${title} has been added to your watch list\n
				Title: ${title},\n
				Description:${description},\n`,
			},
			{ headers: { authorization: `Bearer ${slackToken}` } }
		);
		return responseService(
			res,
			status.OK,
			responseMessages.MOVIE_CREATED,
			movieCreated
		);
	} catch (err) {
		console.log('err :>> ', err);
		return responseService(res, status.INTERNAL_SERVER_ERROR);
	}
};
