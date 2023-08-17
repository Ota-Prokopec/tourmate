import { Location } from '@app/ts-types'
import { getUsersLocationDataByIP } from '@app/utils'
import { Client, Locale as LocaleAppwrite } from 'node-appwrite'

export default class Locale extends LocaleAppwrite {
	protected locale
	constructor(client: Client) {
		super(client)
		this.locale = new LocaleAppwrite(this.client)
	}
	async getLocation(): Promise<Location> {
		const { ip } = await this.locale.get()
		const res = await getUsersLocationDataByIP(ip)
		if (!res.latitude || !res.longitude) throw Error('getUsersLocationDataByIP in localization exceeded rate limit (ipapi.co)')
		return [res.latitude, res.longitude]
	}
}
