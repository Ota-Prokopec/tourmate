import { testingSdk } from '$src/graphql/testingSdk';
import { expect, test } from 'vitest';

test('getAccount', async () => {
	const result = await testingSdk.getAccount();
	expect(result).toMatchInlineSnapshot(`
		{
		  "getAccount": {
		    "_collectionId": "userInfo",
		    "_createdAt": "2023-09-21T18:35:15.532+00:00",
		    "_databaseId": "experiences",
		    "_id": "650c8ce381c119f8ba4e",
		    "_permissions": [
		      "read(\\"user:64ff7025466ccd71773f\\")",
		      "update(\\"user:64ff7025466ccd71773f\\")",
		      "delete(\\"user:64ff7025466ccd71773f\\")",
		      "read(\\"user:64f62d644fd578d1b49e\\")",
		      "update(\\"user:64f62d644fd578d1b49e\\")",
		      "delete(\\"user:64f62d644fd578d1b49e\\")",
		      "read(\\"user:64f624af9070480ec81a\\")",
		      "update(\\"user:64f624af9070480ec81a\\")",
		      "delete(\\"user:64f624af9070480ec81a\\")",
		    ],
		    "_updatedAt": "2023-10-20T17:39:50.383+00:00",
		    "emailVerification": true,
		    "myId": "@myid",
		    "phoneVerification": false,
		    "prefs": {
		      "location": [
		        49.3454317,
		        14.2128524,
		      ],
		      "termsAccepted": null,
		    },
		    "profilePictureURL": "http://res.cloudinary.com/dzvtoifsm/image/upload/v1697823589/experienceApp/profilePictures/bnqjvq5wyz4tipgydwaq.png",
		    "status": true,
		    "userId": "64f624af9070480ec81a",
		    "username": "Ota Prokopec",
		  },
		}
	`);
});
