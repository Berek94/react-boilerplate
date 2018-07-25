const DEVELOPMENT = 'development';
const PRODUCTION = 'production';

const isDevelopment = env => env === DEVELOPMENT;
const isProduction = env => env === PRODUCTION;

const computeDevTool = env => {
	if (isDevelopment(env)) {
		return 'inline-source-map';
	}
	if (isProduction(env)) {
		return 'source-map';
	}

	return false;
};

const getChunkName = (env, ext) => `[name]${isDevelopment(env) ? '' : '-[chunkhash].min'}.${ext}`;
const getFileName = (env, ext) => `[name]${isDevelopment(env) ? '' : '-[hash:8]'}.${ext}`;

module.exports = {
	isDevelopment,
	isProduction,
	computeDevTool,
	getChunkName,
	getFileName,
};
