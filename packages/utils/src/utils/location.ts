export const getUsersLocation = (): Promise<[number, number]> => {
	return new Promise((res) => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
				res([position.coords.latitude, position.coords.longitude])
			})
		}
	})
}
