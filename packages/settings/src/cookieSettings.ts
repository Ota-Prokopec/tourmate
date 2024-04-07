export const cookieSettings = {
	sameSite: 'none',
	domain: `${process.env.SERVER_HOSTNAME_COOKIES}`,
	secure: true,
	maxAge: 999999999999999, //TODO: change this
	httpOnly: true,
	path: '/',
} as const
