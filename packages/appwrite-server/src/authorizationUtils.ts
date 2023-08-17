export const getSessionFromCookie = (cookies: { name: string; value: string }[]) => {
	const sessionNames = [
		'a_session_' + process.env.APPWRITE_PROJECT_ID?.toLowerCase(),
		'a_session_' + process.env.APPWRITE_PROJECT_ID?.toLowerCase() + '_legacy',
	]
	const appwriteCookies = cookies.filter((cookie) => sessionNames.includes(cookie.name)).sort((a, b) => a.name.length - b.name.length)

	const session = appwriteCookies[0] ?? appwriteCookies[1] // [0] is a_session_...... and [1] is a_session_........_legacy, because of sorting
	return session.value
}
