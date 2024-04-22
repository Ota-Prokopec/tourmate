import { z } from 'zod';

const categoryZod = z.union([z.literal('places'), z.literal('users'), z.literal('monuments')]);

export type TSearchCategory = z.infer<typeof categoryZod>;

export const isSearchCategory = (value: unknown): value is TSearchCategory => {
	try {
		categoryZod.parse(value);
		return true;
	} catch (error) {
		return false;
	}
};
