export const cacheApolloError = (response: unknown) => {
	console.log(response)

	const message = (response as Record<any, any>).response.errors[0].message as string

	return { message }
}
