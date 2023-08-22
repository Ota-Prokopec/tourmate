module.exports = async function (req) {
	const serverUrl = req.variables.PRODUCTION_URL;
	const apiKey = req.variables.EXPERIENCES_API_KEY;

	const response = await fetch(serverUrl, {
		method: 'POST',
		headers: {
			apiKey: apiKey
		},
		body: JSON.stringify(req.payload)
	});

	return response;
};
