import { protectedProcedure } from '$server/middlewares/isAuthed';
import appwriteSveltekitSSR, { Models, appwriteDocumentKeys } from '@app/appwrite-server';
import type { Preferences, ExcludeDocument, UserInfo } from '@app/ts-types';
import { getUserInfoByUserId } from '@app/user-database-server';
import { json } from '@sveltejs/kit';
import lodash from 'lodash';
import appwriteServer from '@app/appwrite-server';

export const test = protectedProcedure.query(async ({ ctx }) => {});
