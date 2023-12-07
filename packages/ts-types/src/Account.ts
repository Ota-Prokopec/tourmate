import { Document, GraphqlDocument } from './Document'

export type UserInfo = {
	userId: string
	myId: string
	username: string
	profilePictureURL: URL
}

export type Preferences = { termsAccepted: boolean; mapRange: number }

export type UserInfoDocument = Document<UserInfo>
export type UserInfoGraphqlDocument = GraphqlDocument<UserInfo>
export type UserInfoDocumentCreate = Omit<UserInfo, 'profilePictureURL'> & {
	profilePictureURL?: URL | undefined | null
}

export type Token = {
	userId: string
	fcmFirebaseToken?: string | null | undefined
}

export type TokenDocument = Document<Token>
export type TokenGraphqlDocument = GraphqlDocument<Token>
export type TokenDocumentCreate = Token
