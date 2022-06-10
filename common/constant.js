const userTypes = {
	ADMIN: 'ADMIN',
	BASIC_USER: 'BASIC_USER',
};

const SALT_ROUNDS = 10;

const collectionsName = {
	USERS: 'users',
	MOVIES: 'movies',
};
const statusCode = {
	OK: 200,
	BAD_INPUT: 400,
	UNAUTHORIZED: 401,
	INTERNAL_SERVER_ERROR: 500,
};

const status = {
	OK: 'OK',
	BAD_INPUT: 'BAD_INPUT',
	UNAUTHORIZED: 'UNAUTHORIZED',
	INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
};
const responseMessages = {
	USER_CREATED: 'User created successfully',
	USER_SIGNUP: 'User sign up successfully',
	MOVIE_CREATED: 'Movie created successfully',
	GET_MOVIES: 'Movies get successfully',
	USER_NOT_FOUND: 'User not found',
	UNAUTHORIZED: 'You are not authorized!',
	LOGIN_SUCCESS: 'User logged in successfully',
	INVALID_PASSWORD: 'Invalid password, please check your password again',
	MOVIES_LIST: 'Get movies successfully',
	EMAIL_ALREADY_EXIST: 'Email already in use, please try different email',
	INTERNAL_SERVER_ERROR: 'Something went wrong, please try again',
	TOKEN_NOT_FOUND: 'Token not found',
};

module.exports = {
	userTypes,
	collectionsName,
	statusCode,
	status,
	responseMessages,
	SALT_ROUNDS,
};
