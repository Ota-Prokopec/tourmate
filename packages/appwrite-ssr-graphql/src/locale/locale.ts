import { Client, Locale as LocaleAppwrite } from 'appwrite'

export type Location = [number, number]

export default class Locale extends LocaleAppwrite {
	protected locale
	constructor(client: Client) {
		super(client)
		this.locale = new LocaleAppwrite(this.client)
	}
}
