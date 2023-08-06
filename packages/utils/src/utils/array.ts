// @ts-nocheck

export const getUniqueListBy = <Type>(array: Type[], keys: string[] | string): Type[] => {
	if (!array) return []
	if (!keys.length || !array.length) return []

	return Array.from(array).reduce((list, item) => {
		const hasItem = list.find((listItem) => Array.from(keys).every((key) => listItem[key] === item[key]))
		if (!hasItem) list.push(item)
		return list
	}, [])
}
