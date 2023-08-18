export const notify = async (
	title: string,
	options: NotificationOptions = {
		icon: '/icon.png',
	},
) => {
	const res = await Notification.requestPermission()
	if (res === 'denied') throw new Error('user denied the permissions for notifications')

	const notification = new Notification(title, options)
	return notification
}
