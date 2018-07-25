const {isDevelopment} = require('./helpers');

module.exports = env => {
	if (!isDevelopment(env)) return {};

	return {
		compress: true,
		overlay: true,
	};
};
