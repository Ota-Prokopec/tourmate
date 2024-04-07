module.exports = async ({ req, res, log, error }) => {
	const apiUrl = 'https://api.tourmate.cz'

	const responseFromGraphql = await fetch(apiUrl, { method: 'GET' })

	return res.json({
		response: responseFromGraphql,
	})
}
