module.exports = async function (req, res) {
	const apiUrl = req.variables['apiUrl'] ?? undefined

	const res = await fetch(apiUrl, { method: 'GET' })

	res.json({
		response: res,
	})
}
