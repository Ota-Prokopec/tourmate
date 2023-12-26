export const getSystemLanguageAbbreviation = () => {
	return Intl.DateTimeFormat().resolvedOptions().locale.split('-').at(0)
}
