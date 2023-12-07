export const getPrettyNumber = (value: number) => {
	return Intl.NumberFormat('en', { notation: 'compact' }).format(Math.floor(value))
}
