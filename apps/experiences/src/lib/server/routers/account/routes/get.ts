import { protectedProcedure } from '$server/middlewares/isAuthed';
import appwriteSveltekitSSR, { Models, appwriteDocumentKeys } from '@app/appwrite-server';
import type { Preferences, ExcludeDocument, UserInfo } from '@app/ts-types';
import { getUserInfoByUserId } from '@app/user-database-server';
import { json } from '@sveltejs/kit';
import lodash from 'lodash';

export type TGetAccountOutputData =
	| ExcludeDocument<UserInfo> &
			Omit<Models.User<Preferences>, 'hash'> & {
				userInfoDocumentId: string;
				userInfoDatabaseId: string;
				userInfoPermissions: string[];
				userInfoCollectionId: string;
				userInfoUpdatedAt: string;
				userInfoCreatedAt: string;
			};

export const get = protectedProcedure.query(async ({ ctx }): Promise<TGetAccountOutputData> => {
	const { account } = appwriteSveltekitSSR.set(ctx.appwriteClients.user);
	const [appwriteAccount, quiziAccount] = await Promise.all([
		account.get<Preferences>(),
		getUserInfoByUserId(ctx.user.$id)
	]);
	if (!quiziAccount) throw new Error('user does not have Quizi account');

	return {
		...lodash.omit(appwriteAccount, 'hash'),
		...lodash.omit(quiziAccount, appwriteDocumentKeys),
		...{
			userInfoDocumentId: quiziAccount.$id,
			userInfoDatabaseId: quiziAccount.$databaseId,
			userInfoPermissions: quiziAccount.$permissions,
			userInfoCollectionId: quiziAccount.$collectionId,
			userInfoUpdatedAt: quiziAccount.$updatedAt,
			userInfoCreatedAt: quiziAccount.$createdAt
		}
	};
});
