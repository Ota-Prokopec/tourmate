import { PUBLIC_SESSION } from '$env/static/public';
import { sdkssr } from '$src/graphql/sdkssr';
import { test, expectTypeOf, expect } from 'vitest';

const monumentId = '6532bdef9ddeb651bf2a';
const session = PUBLIC_SESSION;

test('load monument', async () => {
	const monument = await (
		await sdkssr({
			cookies: { getAll: () => [{ name: 'a_session_experiences', value: session }] }
		}).getMonumentCard({
			id: monumentId
		})
	).getMonument;
	expectTypeOf(monument).toBeObject();
	expectTypeOf(monument.placeDetail._id).toBeString();
});
