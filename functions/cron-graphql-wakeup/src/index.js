module.exports = async function (req, res) {
	const apiUrl = process.env.apiUrl

	const responseFromGraphql = await fetch(apiUrl, { method: 'GET' })

	res.json({
		response: responseFromGraphql,
	})
}
