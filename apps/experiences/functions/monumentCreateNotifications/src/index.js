const fetch = require('node-fetch');
module.exports = async function (req) {
	const serverUrl = req.variables.PRODUCTION_URL;
	const apiKey = req.variables.EXPERIENCES_API_KEY;

	console.log(serverUrl, apiKey);

	const response = await fetch(`${serverUrl}/api/notification`, {
		method: 'POST',
		headers: {
			apiKey: apiKey
		},
		body: JSON.stringify({
			title: 'new monument',
			body: req.payload.name
		})
	});

	return response;
};
