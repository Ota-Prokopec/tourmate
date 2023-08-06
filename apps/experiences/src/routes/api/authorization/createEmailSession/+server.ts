import appwriteServer from '@app/appwrite-server';
import { RequestHandler, error, json } from '@sveltejs/kit';
import cookies from 'cookie';

export const POST: RequestHandler = async ({ request, fetch }) => {
	try {
		const { email, password }: { email: string; password: string } = await request.json();

		const { account, client } = appwriteServer.none();

		console.log(client);

		const { sessionLegacyToken, sessionToken } = await account.createSession(
			async () =>
				await fetch(`${process.env.APPWRITE_ENDPOINT}/account/sessions/email`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'x-appwrite-project': process.env.APPWRITE_PROJECT_ID
					},
					body: JSON.stringify({
						email,
						password
					})
				})
		);

		const sessionTokenCookie = cookies.serialize(sessionToken.name, sessionToken.value, {
			domain: 'localhost',
			secure: sessionToken.secure,
			sameSite: sessionToken.sameSite,
			path: '/',
			maxAge: sessionToken.maxAge,
			httpOnly: sessionToken.httpOnly,
			expires: sessionToken.expires
		});
		const sessionLegacyTokenCookie = cookies.serialize(
			sessionLegacyToken.name,
			sessionLegacyToken.value,
			{
				domain: 'localhost',
				secure: sessionToken.secure,
				sameSite: sessionToken.sameSite,
				path: '/',
				maxAge: sessionToken.maxAge,
				httpOnly: sessionToken.httpOnly,
				expires: sessionToken.expires
			}
		);

		return json(sessionLegacyToken.value, {
			//@ts-ignore
			//! check this headers error
			headers: {
				'set-cookie': [sessionTokenCookie, sessionLegacyTokenCookie]
			}
		});
	} catch (err) {
		console.log(err);
		throw error(401);
		return json({});
	}
};
