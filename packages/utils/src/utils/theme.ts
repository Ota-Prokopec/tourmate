export const getThemeInternalMode = (): 'dark' | 'light' => {
	return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}
