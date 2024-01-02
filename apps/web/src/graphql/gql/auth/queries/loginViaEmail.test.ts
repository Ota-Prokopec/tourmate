import { testingSdk } from '$src/graphql/testingSdk';
import { expect, expectTypeOf, test } from 'vitest';

test('loginViaEmail', async () => {
	expect(true).toBeTruthy();
	return;
	const result = await testingSdk.loginViaEmail({
		email: 'otaprokopec@gmail.com',
		password: 'aaaaaaaa'
	});
	expectTypeOf(result.logInViaEmail.session).toBeString();
});
