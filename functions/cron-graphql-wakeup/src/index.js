module.exports = async function () {
	const apiUrl = req.variables['apiUrl']

	const res = await fetch(apiUrl, { method: 'GET' })

	res.json({
		response: res,
	})
}
