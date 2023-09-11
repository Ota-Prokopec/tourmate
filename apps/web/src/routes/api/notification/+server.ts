import appwriteServer, { Query } from '@app/appwrite-server';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import cookies from 'cookie';
import { notifications } from '@app/firebase-server';

const cacheName = 'expsCache';

export const GET: RequestHandler = async ({ request }) => {
	console.log('notification', { request });

	const apiKey = request.headers.get('apiKey');

	console.log(apiKey);

	/* const { title, body, imageUrl } = (await request.json()) as {
		title: string | undefined;
		body: string | undefined;
		imageUrl: string | undefined;
	}; */

	//console.log(title, body);

	const { collections } = appwriteServer.setAdmin();

	//check api key
	//if (!apiKey || !checkExperiencesAPIKey(apiKey)) throw error(403);

	//get all users for notification
	const docs = await collections.token.listDocuments([Query.limit(100)]);
	console.log(`only ${docs.total} documents`);

	const tokens = docs.documents.map((d) => d.fcmFirebaseToken).filter((token) => token) as string[];

	const notificationRes = await notifications.create(
		{
			body: 'body',
			title: 'title',
			icon: `${cacheName}/icon.png`
			//	imageUrl: imageUrl
		},
		tokens
	);

	console.log(notificationRes);

	return json({});
};
