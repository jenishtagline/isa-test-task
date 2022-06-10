const express = require('express');
const router = express.Router();
const usersRoute = require('./users.routes');
const moviesRoute = require('./movies.routes');

router.use('/user', usersRoute);
router.use('/movie', moviesRoute);

router.use((err, req, res, next) => {
	if (err instanceof ValidationError) {
		return res.status(err.statusCode).json(err);
	}
	return res.status(500).json(err);
});

module.exports = router;
