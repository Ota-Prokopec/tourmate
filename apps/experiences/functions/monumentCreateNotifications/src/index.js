const fetch = require('node-fetch');
module.exports = async function (req) {
	const serverUrl = req.variables.PRODUCTION_URL;
	const apiKey = req.variables.EXPERIENCES_API_KEY;

	console.log(serverUrl, apiKey);

	const response = await fetch(`${serverUrl}/api/notifications/appwriteOnMonumentCreateEvent`, {
		method: 'POST',
		headers: {
			apiKey: apiKey
		},
		body: JSON.stringify(req.payload)
	});

	return response;
};
