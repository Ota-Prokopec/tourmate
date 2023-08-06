export const removeKeysFromObject = <TObject extends Record<string, any>, TKeys extends ReadonlyArray<keyof TObject>>(obj: TObject, keys: TKeys) => {
	return Object.entries(obj)
		.filter(([key]) => !keys.includes(key))
		.reduce((acc, [key, value]) => {
			acc[key as keyof Omit<TObject, TKeys[number]>] = value
			return acc
		}, {} as Omit<TObject, TKeys[number]>)
}
