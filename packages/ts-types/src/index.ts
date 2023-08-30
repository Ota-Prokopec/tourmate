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

import {
	userInfoDocumentCreateZod,
	userInfoDocumentZod,
	userInfoZod,
	tokenZod,
	tokenDocumentZod,
	tokenDocumentCreateZod,
	Token,
	TokenDocument,
	TokenDocumentCreate,
} from './Account'
import { IP, IPApiResponse } from './TsTypes'
import type { UserInfoDocument, UserInfoDocumentCreate, UserInfo } from './Account'
import { Preferences } from './Account'
import {
	Monument,
	MonumentDocument,
	monumentDocumentZod,
	monumentZod,
	MonumentDocumentCreate,
	monumentDocumentCreateZod,
} from './Experience'
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
	monumentZod,
	monumentDocumentZod,
	type MonumentDocument,
	type Monument,
	type MonumentDocumentCreate,
	monumentDocumentCreateZod,
	type IP,
	type IPApiResponse,
	tokenZod,
	tokenDocumentZod,
	tokenDocumentCreateZod,
	type Token,
	type TokenDocument,
	type TokenDocumentCreate,
	type UserInfoDocument,
	type UserInfoDocumentCreate,
	type UserInfo,
	type Preferences,
}

export type OAuth2Providers = 'facebook' | 'google'

export type RequiredDeep<T> = {
	[P in keyof T]-?: T[P] extends object ? RequiredDeep<T[P]> : T[P]
}
