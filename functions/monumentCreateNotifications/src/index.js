const fetch = require('node-fetch')
module.exports = async function (req, res) {
	const serverUrl = req.variables['SERVER_HOSTNAME']
	const apiKey = req.variables['EXPERIENCES_API_KEY']
	const eventData = JSON.parse(req.variables.APPWRITE_FUNCTION_EVENT_DATA)

	const response = await fetch(`${serverUrl}/apikey/notification/monument/send`, {
		method: 'POST',
		headers: {
			'experiences-api-key': apiKey,
			'content-type': 'application/json',
		},
		body: JSON.stringify({
			monumentId: eventData.$id,
			img: eventData.pictureURL,
		}),
	})

	res.json(response)
}
