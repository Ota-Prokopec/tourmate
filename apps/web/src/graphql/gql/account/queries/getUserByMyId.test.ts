import { testingSdk } from '$src/graphql/testingSdk';
import { expect, test } from 'vitest';

test('getAccount', async () => {
	const result = await testingSdk.getUserByMyId({ myId: '@myId' });
	expect(result).toMatchInlineSnapshot();
});
