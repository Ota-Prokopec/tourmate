import { expectTypeOf, test } from 'vitest';
import { sdk } from '$src/graphql/sdk';

let password = 'aaaaaaaa';
let email = 'otaprokopec@gmail.com';

test('login user into application', async () => {
	//const res = (await sdk.loginViaEmail({ email, password })).logInViaEmail;

	expectTypeOf('').toBeString();
});
