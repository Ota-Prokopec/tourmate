import { z } from 'zod';

const categoryZod = z.union([z.literal('places'), z.literal('users'), z.literal('monuments')]);

export type Category = z.infer<typeof categoryZod>;

export const isCategory = (value: unknown): value is Category => {
	try {
		categoryZod.parse(value);
		return true;
	} catch (error) {
		return false;
	}
};
