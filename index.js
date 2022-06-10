const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();
require('./config/database');
const { ValidationError } = require('joi');

const routes = require('./routes/index');
const port = process.env.PORT || 3434;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api', routes);

app.use((err, req, res, next) => {
	if (err instanceof ValidationError) {
		return res.status(err.statusCode).json(err);
	}
	return res.status(500).json(err);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
