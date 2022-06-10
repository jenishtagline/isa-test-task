const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);
const conn = mongoose.connection;
conn.on('connected', () => {
	console.log('Database Connected Successfully');
});
conn.on('error', console.error.bind(console, 'Connection Failed'));
module.exports = conn;
