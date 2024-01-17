import type { ColorTheme } from './Application/ColorTheme'
import { Language } from './Application/Language'
import type { Document, GraphqlDocument } from './Document'

export type UserInfo = {
	userId: string
	myId: string
	username: string
	profilePictureURL: (URL & string) | string
}

export type Preferences = {
	termsAccepted: boolean
	mapRange: number
	colorTheme: ColorTheme
	language: Language
}

export type UserInfoDocument = Document<UserInfo>
export type UserInfoGraphqlDocument = GraphqlDocument<UserInfo>
export type UserInfoDocumentCreate = Omit<UserInfo, 'profilePictureURL'> & {
	profilePictureURL?: ((URL & string) | string) | undefined | null
}

export type Token = {
	userId: string
	fcmFirebaseToken: string
}

export type TokenDocument = Document<Token>
export type TokenGraphqlDocument = GraphqlDocument<Token>
export type TokenDocumentCreate = Token
