export type Method = 'POST' | 'GET' | 'DELETE' | 'PUT' | 'OPTIONS'
type Body = { [key: string]: unknown }
const fetchnative = async (path: string, method: Method, body: Body, headers: HeadersInit = []) => {
	const res = await fetch(path, {
		method: method,
		body: JSON.stringify(body),
		headers: headers,
	})
	return await res.json()
}
export default fetchnative

export const post = (path: string, body: Body, headers: HeadersInit = []) => {
	return fetchnative(path, 'POST', body, headers)
}
