const read = async (typeStartsWith: string) => {
	let items = await navigator.clipboard.read()

	items = items.filter((item) => {
		const types = item.types
		let ok = false
		types.forEach((type) => {
			if (type.startsWith(typeStartsWith)) ok = true
		})
		return ok
	})
	return items
}

const readImage = async () => {
	const clipboard = (await read('image'))[0]
	const blob = await clipboard?.getType('image/png')
	const file = new File([blob], 'image.png', { type: 'image/png' })

	return clipboard ? file : null
}

export const clipboard = { read, readImage }
