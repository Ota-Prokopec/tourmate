import checkExperiencesAPIKey from '$lib/server/lib/checkExperiencesAPIKey';
import appwriteServer, { Query } from '@app/appwrite-server';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import cookies from 'cookie';
import { notifications } from '@app/firebase-server';

import '@total-typescript/ts-reset';

export const POST: RequestHandler = async ({ request }) => {
	console.log('post');

	try {
		const apiKey = request.headers.get('apiKey');

		console.log(apiKey);

		const { title, body } = (await request.json()) as { title: string; body: string };

		console.log(title, body);

		const { collections } = appwriteServer.setAdmin();

		//check api key
		if (!apiKey || !checkExperiencesAPIKey(apiKey)) throw error(403);

		//get all users for notification
		const docs = await collections.token.listDocuments([Query.limit(100)]);
		console.log(`only ${docs.total} documents`);

		const tokens = docs.documents
			.map((d) => d.fcmFirebaseToken)
			.filter((token) => token) as string[];

		const notificationRes = await notifications.create(
			{
				title: title,
				body: body
			},
			tokens
		);

		console.log(notificationRes);

		return json({});
	} catch (err) {
		console.log(err);

		throw error(403);
	}
};
