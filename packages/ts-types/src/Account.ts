import { Document, GraphqlDocument } from './Document'
import type { Location } from './Experience'
import { Base64 } from './TsTypes'

export type UserInfo = {
	userId: string
	myId: string
	username: string
	profilePictureURL?: URL
}

export type Token = {
	userId: string
	fcmFirebaseToken?: string
}

export type Preferences = { termsAccepted: boolean; location: Location }

export type UserInfoDocument = Document<UserInfo>
export type UserInfoGraphqlDocument = GraphqlDocument<UserInfo>
export type UserInfoDocumentCreate = UserInfo

export type TokenDocument = Document<Token>
export type TokenGraphqlDocument = GraphqlDocument<Token>
export type TokenDocumentCreate = Token
