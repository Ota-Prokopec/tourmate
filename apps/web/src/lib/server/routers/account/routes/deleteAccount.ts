import { protectedProcedure } from '$server/middlewares/isAuthed';
import appwriteSveltekitSSR, { Query } from '@app/appwrite-server';

export type TDeleteAccountOuputData = void;

export const deleteAccount = protectedProcedure.mutation(async ({ ctx }) => {
	const { users, collections } = appwriteSveltekitSSR.setAdmin();
	await Promise.all([
		collections.userInfo.deleteDocument([Query.equal('userId', ctx.user.$id)]),
		users.delete(ctx.user.$id)
	]);
});
