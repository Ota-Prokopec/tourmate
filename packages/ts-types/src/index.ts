import { z } from 'zod'
import {
	appWriteDocumentOptionalZod,
	appwriteDocumentForOmit,
	Document,
	ExcludeDocument,
	ExcludeDocumentDeep,
	PartialDocumentDeepZod,
	PartialDocumentDdeepZod,
} from './Document'

import { userInfoDocumentCreateZod, userInfoDocumentZod, userInfoZod } from './Account'
import {
	ExperienceDocument,
	Experience,
	experienceDocumentZod,
	experienceZod,
	experienceDocumentCreateZod,
	ExperienceDocumentCreate,
	locationZod,
	Location,
	LoadedExperience,
	loadedExperienceZod,
} from './Experience'

export type { Base64 } from './TsTypes'

export {
	userInfoDocumentCreateZod,
	userInfoDocumentZod,
	userInfoZod,
	appWriteDocumentOptionalZod,
	appwriteDocumentForOmit,
	type Document,
	type ExcludeDocument,
	type ExcludeDocumentDeep,
	PartialDocumentDeepZod,
	PartialDocumentDdeepZod,
	type Location,
	type ExperienceDocument,
	type Experience,
	experienceDocumentZod,
	experienceZod,
	experienceDocumentCreateZod,
	type ExperienceDocumentCreate,
	locationZod,
	type LoadedExperience,
	loadedExperienceZod,
}

export type UserInfo = z.infer<typeof userInfoZod>
export type UserInfoDocument = z.infer<typeof userInfoDocumentZod>
export type UserInfoDocumentCreate = z.infer<typeof userInfoDocumentCreateZod>

export type OAuth2Providers = 'facebook' | 'google'

export type RequiredDeep<T> = {
	[P in keyof T]-?: T[P] extends object ? RequiredDeep<T[P]> : T[P]
}
