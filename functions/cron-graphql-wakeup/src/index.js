module.exports = async function (req, res) {
	const apiUrl = req.variables['apiUrl']

	const responseFromGraphql = await fetch(apiUrl, { method: 'GET' })

	res.json({
		response: responseFromGraphql,
	})
}
