const express = require('express');
const router = express.Router();
const { Auth } = require('../middleware/auth');
const { getAllMovies, create } = require('../controllers/movies.controller');
const { userTypes } = require('../common/constant');
const { validate } = require('../middleware/validate');
const { createMovieValidation, getMoviesValidation } = require('../validation/movies.validation');

router.get(
	'/',
	validate(getMoviesValidation.body, 'body'),
	validate(getMoviesValidation.query, 'query'),
	Auth([userTypes.BASIC_USER, userTypes.ADMIN]),
	getAllMovies
);

router.post(
	'/add',
	validate(createMovieValidation.body, 'body'),
	Auth([userTypes.ADMIN]),
	create
);

module.exports = router;
