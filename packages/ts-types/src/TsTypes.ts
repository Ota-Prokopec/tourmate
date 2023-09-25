type Opaque<T, K extends string> = T & { __typename: K }

export type Base64 = Opaque<string, 'base64'>

export type IP = string

export type IPApiResponse = {
	ip: IP
	version: string
	city: string
	region: string
	region_code: string
	country_code: string
	country_code_iso3: string
	country_name: string
	country_capital: string
	country_tld: string
	continent_code: string
	in_eu: false
	postal: string
	latitude: number
	longitude: number
	timezone: string
	utc_offset: string
	country_calling_code: string
	currency: string
	currency_name: string
	languages: string
	country_area: number
	country_population: number
	asn: string
	org: string
}

export type SocialPlatform = 'facebook' | 'google' | 'discord' | 'github'

export type RequiredDeep<T> = {
	[P in keyof T]-?: T[P] extends object ? RequiredDeep<T[P]> : T[P]
}

export type DatabaseValueTypes =
	| string
	| number
	| string[]
	| number[]
	| boolean
	| URL
	| Base64
	| undefined
	| null
	| any[]
	| Record<string, string | number | string[] | number[] | boolean | URL | Base64 | undefined | null>

export const urlToString = (url: URL | undefined | null): string | undefined => {
	return url as unknown as string | undefined
}

export type GetTypesOfmethodsInClass<T> = {
	[K in keyof T]: T[K] extends (...args: any[]) => infer R ? R : never
}
