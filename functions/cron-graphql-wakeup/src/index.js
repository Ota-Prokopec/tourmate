export default async ({ req, res }) => {
	const apiUrl = process.env.apiUrl

	const responseFromGraphql = await fetch(apiUrl, { method: 'GET' })

	return res.json({
		response: responseFromGraphql,
	})
}
