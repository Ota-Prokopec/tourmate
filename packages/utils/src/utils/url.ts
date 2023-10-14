export const changeURLwithoutReloading = (url: URL | string) => {
	window.history.pushState('', '', url)
}
