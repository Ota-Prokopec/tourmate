export const cacheApolloError = (response: unknown) => {
	const message = (response as Record<any, any>).response.errors[0].message as string

	return { message }
}
