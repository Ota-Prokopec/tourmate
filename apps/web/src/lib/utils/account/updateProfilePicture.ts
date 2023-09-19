import { buckets, collections } from '@app/appwrite-client';
import * as permissions from '@app/appwrite-permissions';

export const updateProfilePicture = async (
	userId: string,
	userIntoDocumentId: string,
	currentPictureUrl: URL | null | undefined,
	file: File
) => {
	try {
		const currentPicture =
			currentPictureUrl &&
			(await buckets.profilePictures.getFile(
				buckets.profilePictures.getParamsFromURL(currentPictureUrl).fileId
			));
		if (currentPicture && currentPicture.$id) {
			// delete old picture
			await buckets.profilePictures.deleteFile(currentPicture.$id);
		}
		const newPicture = await buckets.profilePictures.createFile(file, permissions.owner(userId));
		await collections.userInfo.updateDocument(userIntoDocumentId, {
			profilePictureURL: buckets.profilePictures.getFileURL(newPicture.$id)
		});
	} catch (error) {
		console.log(error);
	}
};
