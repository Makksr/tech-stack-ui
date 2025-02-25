// const withCSS = require('@zeit/next-css')

// module.exports = withCSS({})
module.exports = {
	publicRuntimeConfig: {
		// Add your public runtime configuration here
		REACT_APP_APP_NAME: process.env.REACT_APP_APP_NAME,
		REACT_APP_API: process.env.REACT_APP_API,
		REACT_APP_PRODUCTION: process.env.REACT_APP_NODE_ENV === 'production',
		REACT_APP_DOMAIN: process.env.REACT_APP_DOMAIN,
		REACT_APP_FB_APP_ID: process.env.REACT_APP_FB_APP_ID,
	},
	env: {
		// Add your environment variables here
		CUSTOM_KEY: process.env.REACT_APP_CUSTOM_KEY,
	},
}
