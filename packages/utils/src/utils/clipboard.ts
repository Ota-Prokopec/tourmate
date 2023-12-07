const read = async (typeStartsWith: string) => {
	const items = await navigator.clipboard.read()

	return items.filter((item) => {
		const types = item.types
		let ok = false
		types.forEach((type) => {
			if (type.startsWith(typeStartsWith)) ok = true
		})
		return ok
	})
}

const readImage = async () => {
	const clipboard = (await read('image'))[0] ?? (await read('text'))[0]

	const blob = await clipboard?.getType('image/png')
	if (!blob) throw new Error('Blob not found')
	const file = new File([blob], 'image.png', { type: 'image/png' })

	return clipboard ? file : null
}

const copy = (value: string) => {
	return navigator.clipboard.writeText(value)
}

export const clipboard = { read, readImage, copy }
