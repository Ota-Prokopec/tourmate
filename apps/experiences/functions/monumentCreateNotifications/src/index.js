const fetch = require('node-fetch');
module.exports = async function (req, res) {
	const serverUrl = req.variables.PRODUCTION_URL;
	const apiKey = req.variables.EXPERIENCES_API_KEY;
	const eventData = JSON.parse(req.variables.APPWRITE_FUNCTION_EVENT_DATA);

	fetch(`${serverUrl}/api/notification`, {
		method: 'POST',
		headers: {
			apiKey: apiKey,
			'content-type': 'application/json'
		},
		body: JSON.stringify({
			title: 'Byl přidán nový zážitek',
			body: eventData.name
		})
	});

	res.json(eventData);
};
