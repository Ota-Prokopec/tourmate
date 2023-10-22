import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Location: { input: [number, number]; output: [number, number]; }
  Topic: { input: "castle" | "monument" | "person" | "animals" | "hiking"; output: "castle" | "monument" | "person" | "animals" | "hiking"; }
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: { input: URL; output: URL; }
};

export type Account = {
  __typename?: 'Account';
  _collectionId: Scalars['String']['output'];
  _createdAt: Scalars['String']['output'];
  _databaseId: Scalars['String']['output'];
  _id: Scalars['String']['output'];
  _permissions: Array<Scalars['String']['output']>;
  _updatedAt: Scalars['String']['output'];
  emailVerification?: Maybe<Scalars['Boolean']['output']>;
  experiences: Array<Experience>;
  monuments: Array<Monument>;
  myId: Scalars['String']['output'];
  phoneVerification?: Maybe<Scalars['Boolean']['output']>;
  prefs?: Maybe<UsersPreferences>;
  /** This is URL of profile picture. Not its id. */
  profilePictureURL?: Maybe<Scalars['URL']['output']>;
  status?: Maybe<Scalars['Boolean']['output']>;
  userId: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type CreateAccountInput = {
  myId: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreateExperienceInput = {
  location: Scalars['Location']['input'];
  picture: Scalars['String']['input'];
  placeName: Scalars['String']['input'];
};

export type CreateMonumentInput = {
  about: Scalars['String']['input'];
  location: Scalars['Location']['input'];
  name: Scalars['String']['input'];
  picture?: InputMaybe<Scalars['String']['input']>;
  placeName: Scalars['String']['input'];
  topics: Array<Scalars['Topic']['input']>;
};

export type EmailLogin = {
  __typename?: 'EmailLogin';
  session: Scalars['String']['output'];
};

export type Experience = {
  __typename?: 'Experience';
  _collectionId: Scalars['String']['output'];
  _createdAt: Scalars['String']['output'];
  _databaseId: Scalars['String']['output'];
  _id: Scalars['String']['output'];
  _permissions: Array<Scalars['String']['output']>;
  _updatedAt: Scalars['String']['output'];
  imgSrc: Scalars['URL']['output'];
  liked?: Maybe<ExperienceLike>;
  likes: Array<ExperienceLike>;
  location: Scalars['Location']['output'];
  placeDetail: PlaceDetail;
  placeDetailId: Scalars['String']['output'];
  user: Account;
  userId: Scalars['String']['output'];
};

export type ExperienceInput = {
  location: Scalars['Location']['input'];
  range: Scalars['Int']['input'];
};

export type ExperienceLike = {
  __typename?: 'ExperienceLike';
  _collectionId: Scalars['String']['output'];
  _createdAt: Scalars['String']['output'];
  _databaseId: Scalars['String']['output'];
  _id: Scalars['String']['output'];
  _permissions: Array<Scalars['String']['output']>;
  _updatedAt: Scalars['String']['output'];
  experienceId: Scalars['String']['output'];
  user: Account;
  userId: Scalars['String']['output'];
};

export type Monument = {
  __typename?: 'Monument';
  _collectionId: Scalars['String']['output'];
  _createdAt: Scalars['String']['output'];
  _databaseId: Scalars['String']['output'];
  _id: Scalars['String']['output'];
  _permissions: Array<Scalars['String']['output']>;
  _updatedAt: Scalars['String']['output'];
  about?: Maybe<Scalars['String']['output']>;
  creator: Account;
  creatorUserId: Scalars['String']['output'];
  liked?: Maybe<MonumentLike>;
  likes: Array<MonumentLike>;
  location: Scalars['Location']['output'];
  name: Scalars['String']['output'];
  nearExperiences: Array<Experience>;
  /** This it an URL not id of picture */
  pictureURL?: Maybe<Scalars['URL']['output']>;
  placeDetail: PlaceDetail;
  placeDetailId: Scalars['String']['output'];
  topics: Array<Scalars['Topic']['output']>;
};

export type MonumentInputByName = {
  limit: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};

export type MonumentLike = {
  __typename?: 'MonumentLike';
  _collectionId: Scalars['String']['output'];
  _createdAt: Scalars['String']['output'];
  _databaseId: Scalars['String']['output'];
  _id: Scalars['String']['output'];
  _permissions: Array<Scalars['String']['output']>;
  _updatedAt: Scalars['String']['output'];
  monumentId: Scalars['String']['output'];
  user: Account;
  userId: Scalars['String']['output'];
};

export type MonumentLocationAndTopicsInput = {
  location: Scalars['Location']['input'];
  range: Scalars['Float']['input'];
  topics: Array<Scalars['Topic']['input']>;
};

export type MonumentLocationInput = {
  location: Scalars['Location']['input'];
  range: Scalars['Float']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createExperience: Experience;
  createMonument: Monument;
  deleteMonument: Scalars['Boolean']['output'];
  likeMonument: MonumentLike;
};


export type MutationCreateExperienceArgs = {
  input: CreateExperienceInput;
};


export type MutationCreateMonumentArgs = {
  input: CreateMonumentInput;
};


export type MutationDeleteMonumentArgs = {
  monumentId: Scalars['String']['input'];
};


export type MutationLikeMonumentArgs = {
  monumentId: Scalars['String']['input'];
};

export type PlaceDetail = {
  __typename?: 'PlaceDetail';
  _collectionId: Scalars['String']['output'];
  _createdAt: Scalars['String']['output'];
  _databaseId: Scalars['String']['output'];
  _id: Scalars['String']['output'];
  _permissions: Array<Scalars['String']['output']>;
  _updatedAt: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  createAccount: Account;
  getAccount: Account;
  getAccountByMyId: Account;
  getAccounts: Array<Account>;
  getExperience: Experience;
  getListOfExperiences: Array<Experience>;
  getListOfMonuments: Array<Monument>;
  getListOfMonumentsByLocation: Array<Monument>;
  getListOfMonumentsByLocationAndTopics: Array<Monument>;
  getListOfMonumentsSearchByName: Array<Monument>;
  getMonument: Monument;
  logInViaEmail: EmailLogin;
  updateProfilePicture: Account;
};


export type QueryCreateAccountArgs = {
  myId: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type QueryGetAccountArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetAccountByMyIdArgs = {
  myId: Scalars['String']['input'];
};


export type QueryGetAccountsArgs = {
  searchingText?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetExperienceArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetListOfExperiencesArgs = {
  input?: InputMaybe<ExperienceInput>;
};


export type QueryGetListOfMonumentsByLocationArgs = {
  input: MonumentLocationInput;
};


export type QueryGetListOfMonumentsByLocationAndTopicsArgs = {
  input: MonumentLocationAndTopicsInput;
};


export type QueryGetListOfMonumentsSearchByNameArgs = {
  input: MonumentInputByName;
};


export type QueryGetMonumentArgs = {
  id: Scalars['String']['input'];
};


export type QueryLogInViaEmailArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QueryUpdateProfilePictureArgs = {
  picture: Scalars['String']['input'];
};

export type UsersPreferences = {
  __typename?: 'UsersPreferences';
  location?: Maybe<Array<Scalars['Float']['output']>>;
  termsAccepted?: Maybe<Scalars['Boolean']['output']>;
};

export type CreateAccountQueryVariables = Exact<{
  myId: Scalars['String']['input'];
  username: Scalars['String']['input'];
}>;


export type CreateAccountQuery = { __typename?: 'Query', createAccount: { __typename?: 'Account', _updatedAt: string, _createdAt: string, userId: string, myId: string, username: string, status?: boolean | null, emailVerification?: boolean | null, phoneVerification?: boolean | null, prefs?: { __typename?: 'UsersPreferences', location?: Array<number> | null, termsAccepted?: boolean | null } | null } };

export type LoginViaEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginViaEmailQuery = { __typename?: 'Query', logInViaEmail: { __typename?: 'EmailLogin', session: string } };

export type GetAccountQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAccountQuery = { __typename?: 'Query', getAccount: { __typename?: 'Account', _permissions: Array<string>, _databaseId: string, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string, userId: string, myId: string, username: string, status?: boolean | null, emailVerification?: boolean | null, phoneVerification?: boolean | null, profilePictureURL?: URL | null, prefs?: { __typename?: 'UsersPreferences', location?: Array<number> | null, termsAccepted?: boolean | null } | null } };

export type GetAccountByMyIdQueryVariables = Exact<{
  myId: Scalars['String']['input'];
}>;


export type GetAccountByMyIdQuery = { __typename?: 'Query', getAccountByMyId: { __typename?: 'Account', _permissions: Array<string>, _databaseId: string, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string, userId: string, myId: string, username: string, status?: boolean | null, emailVerification?: boolean | null, phoneVerification?: boolean | null, profilePictureURL?: URL | null, prefs?: { __typename?: 'UsersPreferences', location?: Array<number> | null, termsAccepted?: boolean | null } | null } };

export type GetAccountWithExperiencesQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAccountWithExperiencesQuery = { __typename?: 'Query', getAccount: { __typename?: 'Account', _permissions: Array<string>, _databaseId: string, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string, userId: string, myId: string, username: string, status?: boolean | null, emailVerification?: boolean | null, phoneVerification?: boolean | null, profilePictureURL?: URL | null, prefs?: { __typename?: 'UsersPreferences', termsAccepted?: boolean | null, location?: Array<number> | null } | null, experiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, imgSrc: URL, location: [number, number], placeDetailId: string }> } };

export type GetAccountWithExperiencesAndMonumentsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAccountWithExperiencesAndMonumentsQuery = { __typename?: 'Query', getAccount: { __typename?: 'Account', _permissions: Array<string>, _databaseId: string, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string, userId: string, myId: string, username: string, status?: boolean | null, emailVerification?: boolean | null, phoneVerification?: boolean | null, profilePictureURL?: URL | null, prefs?: { __typename?: 'UsersPreferences', location?: Array<number> | null, termsAccepted?: boolean | null } | null, experiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, imgSrc: URL, location: [number, number], placeDetailId: string }>, monuments: Array<{ __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], creatorUserId: string, name: string, about?: string | null, pictureURL?: URL | null, placeDetailId: string }> } };

export type GetAccountWithMonumentsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAccountWithMonumentsQuery = { __typename?: 'Query', getAccount: { __typename?: 'Account', _permissions: Array<string>, _databaseId: string, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string, userId: string, myId: string, username: string, status?: boolean | null, emailVerification?: boolean | null, phoneVerification?: boolean | null, profilePictureURL?: URL | null, prefs?: { __typename?: 'UsersPreferences', location?: Array<number> | null, termsAccepted?: boolean | null } | null, monuments: Array<{ __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], creatorUserId: string, name: string, about?: string | null, pictureURL?: URL | null, placeDetailId: string }> } };

export type GetListOfAccountsBySearchingQueryVariables = Exact<{
  searchingText?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetListOfAccountsBySearchingQuery = { __typename?: 'Query', getAccounts: Array<{ __typename?: 'Account', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL?: URL | null }> };

export type GetProfileQueryVariables = Exact<{
  myId: Scalars['String']['input'];
}>;


export type GetProfileQuery = { __typename?: 'Query', getAccountByMyId: { __typename?: 'Account', _permissions: Array<string>, _databaseId: string, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string, userId: string, myId: string, username: string, profilePictureURL?: URL | null, experiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, imgSrc: URL, location: [number, number], placeDetailId: string, likes: Array<{ __typename?: 'ExperienceLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, experienceId: string, user: { __typename?: 'Account', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL?: URL | null } }> }>, monuments: Array<{ __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], creatorUserId: string, name: string, about?: string | null, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, placeDetailId: string, pictureURL?: URL | null, creator: { __typename?: 'Account', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, status?: boolean | null, emailVerification?: boolean | null, phoneVerification?: boolean | null, profilePictureURL?: URL | null }, placeDetail: { __typename?: 'PlaceDetail', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, name: string }, likes: Array<{ __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string, user: { __typename?: 'Account', _id: string, userId: string, myId: string, username: string, profilePictureURL?: URL | null } }>, liked?: { __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string } | null }> } };

export type UpdateProfilePictureQueryVariables = Exact<{
  picture: Scalars['String']['input'];
}>;


export type UpdateProfilePictureQuery = { __typename?: 'Query', updateProfilePicture: { __typename?: 'Account', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, status?: boolean | null, emailVerification?: boolean | null, phoneVerification?: boolean | null, profilePictureURL?: URL | null, prefs?: { __typename?: 'UsersPreferences', location?: Array<number> | null, termsAccepted?: boolean | null } | null } };

export type CreateExperienceMutationVariables = Exact<{
  input: CreateExperienceInput;
}>;


export type CreateExperienceMutation = { __typename?: 'Mutation', createExperience: { __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, imgSrc: URL, location: [number, number], placeDetailId: string } };

export type GetExperienceQueryVariables = Exact<{
  getExperienceId: Scalars['String']['input'];
}>;


export type GetExperienceQuery = { __typename?: 'Query', getExperience: { __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, imgSrc: URL, location: [number, number], placeDetailId: string } };

export type GetExperienceWithCreatorAndHisOtherExperiencesQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetExperienceWithCreatorAndHisOtherExperiencesQuery = { __typename?: 'Query', getExperience: { __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, imgSrc: URL, location: [number, number], placeDetailId: string, user: { __typename?: 'Account', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL?: URL | null, experiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, imgSrc: URL, location: [number, number] }> } } };

export type GetListOfExperienceCardsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListOfExperienceCardsQuery = { __typename?: 'Query', getListOfExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, imgSrc: URL, location: [number, number], placeDetailId: string, user: { __typename?: 'Account', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, myId: string, username: string, profilePictureURL?: URL | null, userId: string }, placeDetail: { __typename?: 'PlaceDetail', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, name: string }, liked?: { __typename?: 'ExperienceLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, experienceId: string } | null, likes: Array<{ __typename?: 'ExperienceLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, experienceId: string, user: { __typename?: 'Account', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, status?: boolean | null, profilePictureURL?: URL | null } }> }> };

export type GetListOfExperiencesQueryVariables = Exact<{
  input?: InputMaybe<ExperienceInput>;
}>;


export type GetListOfExperiencesQuery = { __typename?: 'Query', getListOfExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, imgSrc: URL, location: [number, number], placeDetailId: string }> };

export type GetListOfExperiencesWithCreatorQueryVariables = Exact<{
  input?: InputMaybe<ExperienceInput>;
}>;


export type GetListOfExperiencesWithCreatorQuery = { __typename?: 'Query', getListOfExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, imgSrc: URL, location: [number, number], placeDetailId: string, user: { __typename?: 'Account', userId: string, myId: string, username: string, profilePictureURL?: URL | null } }> };

export type GetListOfItemsForMapQueryVariables = Exact<{
  monument: MonumentLocationInput;
  experience: ExperienceInput;
}>;


export type GetListOfItemsForMapQuery = { __typename?: 'Query', getListOfExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, imgSrc: URL, location: [number, number], placeDetailId: string }>, getListOfMonumentsByLocation: Array<{ __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], creatorUserId: string, name: string, about?: string | null, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, placeDetailId: string, pictureURL?: URL | null }> };

export type GetListOfPlaceCardsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListOfPlaceCardsQuery = { __typename?: 'Query', getListOfMonuments: Array<{ __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], creatorUserId: string, name: string, about?: string | null, placeDetailId: string, pictureURL?: URL | null, creator: { __typename?: 'Account', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, status?: boolean | null, emailVerification?: boolean | null, phoneVerification?: boolean | null, profilePictureURL?: URL | null }, placeDetail: { __typename?: 'PlaceDetail', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, name: string }, likes: Array<{ __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string, user: { __typename?: 'Account', _id: string, userId: string, myId: string, username: string, profilePictureURL?: URL | null } }>, liked?: { __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string } | null }>, getListOfExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, imgSrc: URL, location: [number, number], placeDetailId: string, user: { __typename?: 'Account', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, myId: string, username: string, profilePictureURL?: URL | null, userId: string }, placeDetail: { __typename?: 'PlaceDetail', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, name: string }, liked?: { __typename?: 'ExperienceLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, experienceId: string } | null, likes: Array<{ __typename?: 'ExperienceLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, experienceId: string, user: { __typename?: 'Account', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, status?: boolean | null, profilePictureURL?: URL | null } }> }> };

export type LikeMonumentMutationVariables = Exact<{
  monumentId: Scalars['String']['input'];
}>;


export type LikeMonumentMutation = { __typename?: 'Mutation', likeMonument: { __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string } };

export type CreateMonumentMutationVariables = Exact<{
  input: CreateMonumentInput;
}>;


export type CreateMonumentMutation = { __typename?: 'Mutation', createMonument: { __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], creatorUserId: string, name: string, about?: string | null, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, pictureURL?: URL | null, placeDetailId: string, placeDetail: { __typename?: 'PlaceDetail', name: string, _databaseId: string, _permissions: Array<string>, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string } } };

export type DeleteMonumentMutationVariables = Exact<{
  monumentId: Scalars['String']['input'];
}>;


export type DeleteMonumentMutation = { __typename?: 'Mutation', deleteMonument: boolean };

export type GetListOfMonumentCardsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListOfMonumentCardsQuery = { __typename?: 'Query', getListOfMonuments: Array<{ __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], creatorUserId: string, name: string, about?: string | null, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, placeDetailId: string, pictureURL?: URL | null, creator: { __typename?: 'Account', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, status?: boolean | null, emailVerification?: boolean | null, phoneVerification?: boolean | null, profilePictureURL?: URL | null }, placeDetail: { __typename?: 'PlaceDetail', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, name: string }, likes: Array<{ __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string, user: { __typename?: 'Account', _id: string, userId: string, myId: string, username: string, profilePictureURL?: URL | null } }>, liked?: { __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string } | null }> };

export type GetListOfMonumentCardsByLocationQueryVariables = Exact<{
  input: MonumentLocationInput;
}>;


export type GetListOfMonumentCardsByLocationQuery = { __typename?: 'Query', getListOfMonumentsByLocation: Array<{ __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, creatorUserId: string, name: string, about?: string | null, placeDetailId: string, pictureURL?: URL | null, creator: { __typename?: 'Account', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, status?: boolean | null, emailVerification?: boolean | null, phoneVerification?: boolean | null, profilePictureURL?: URL | null }, placeDetail: { __typename?: 'PlaceDetail', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, name: string }, likes: Array<{ __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string, user: { __typename?: 'Account', _id: string, userId: string, myId: string, username: string, profilePictureURL?: URL | null } }>, liked?: { __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string } | null }> };

export type GetListOfMonumentCardsByLocationAndTopicsQueryVariables = Exact<{
  input: MonumentLocationAndTopicsInput;
}>;


export type GetListOfMonumentCardsByLocationAndTopicsQuery = { __typename?: 'Query', getListOfMonumentsByLocationAndTopics: Array<{ __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], creatorUserId: string, name: string, about?: string | null, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, placeDetailId: string, pictureURL?: URL | null, creator: { __typename?: 'Account', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, status?: boolean | null, emailVerification?: boolean | null, phoneVerification?: boolean | null, profilePictureURL?: URL | null }, placeDetail: { __typename?: 'PlaceDetail', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, name: string }, likes: Array<{ __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string, user: { __typename?: 'Account', _id: string, userId: string, myId: string, username: string, profilePictureURL?: URL | null } }>, liked?: { __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string } | null }> };

export type GetListOfMonumentCardsBySearchingNameQueryVariables = Exact<{
  input: MonumentInputByName;
}>;


export type GetListOfMonumentCardsBySearchingNameQuery = { __typename?: 'Query', getListOfMonumentsSearchByName: Array<{ __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], creatorUserId: string, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, name: string, about?: string | null, placeDetailId: string, pictureURL?: URL | null, creator: { __typename?: 'Account', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, status?: boolean | null, emailVerification?: boolean | null, phoneVerification?: boolean | null, profilePictureURL?: URL | null }, placeDetail: { __typename?: 'PlaceDetail', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, name: string }, likes: Array<{ __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string, user: { __typename?: 'Account', _id: string, userId: string, myId: string, username: string, profilePictureURL?: URL | null } }>, liked?: { __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string } | null }> };

export type GetMonumentQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetMonumentQuery = { __typename?: 'Query', getMonument: { __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], creatorUserId: string, name: string, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, about?: string | null, placeDetailId: string, pictureURL?: URL | null, placeDetail: { __typename?: 'PlaceDetail', name: string, _databaseId: string, _permissions: Array<string>, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string } } };

export type GetMonumentWithCreatorAndNearestListOfExperienceQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetMonumentWithCreatorAndNearestListOfExperienceQuery = { __typename?: 'Query', getMonument: { __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, creatorUserId: string, name: string, about?: string | null, placeDetailId: string, pictureURL?: URL | null, creator: { __typename?: 'Account', _permissions: Array<string>, _databaseId: string, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string, userId: string, myId: string, username: string, status?: boolean | null, emailVerification?: boolean | null, phoneVerification?: boolean | null, profilePictureURL?: URL | null }, nearExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, imgSrc: URL, location: [number, number], placeDetailId: string }>, placeDetail: { __typename?: 'PlaceDetail', name: string, _databaseId: string, _permissions: Array<string>, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string } } };


export const CreateAccountDocument = gql`
    query createAccount($myId: String!, $username: String!) {
  createAccount(myId: $myId, username: $username) {
    _updatedAt
    _createdAt
    userId
    myId
    username
    status
    emailVerification
    phoneVerification
    prefs {
      location
      termsAccepted
    }
  }
}
    `;
export const LoginViaEmailDocument = gql`
    query loginViaEmail($email: String!, $password: String!) {
  logInViaEmail(email: $email, password: $password) {
    session
  }
}
    `;
export const GetAccountDocument = gql`
    query getAccount($userId: String) {
  getAccount(userId: $userId) {
    _permissions
    _databaseId
    _id
    _collectionId
    _updatedAt
    _createdAt
    userId
    myId
    username
    status
    emailVerification
    phoneVerification
    profilePictureURL
    prefs {
      location
      termsAccepted
    }
  }
}
    `;
export const GetAccountByMyIdDocument = gql`
    query getAccountByMyId($myId: String!) {
  getAccountByMyId(myId: $myId) {
    _permissions
    _databaseId
    _id
    _collectionId
    _updatedAt
    _createdAt
    userId
    myId
    username
    status
    emailVerification
    phoneVerification
    profilePictureURL
    prefs {
      location
      termsAccepted
    }
  }
}
    `;
export const GetAccountWithExperiencesDocument = gql`
    query getAccountWithExperiences($userId: String) {
  getAccount(userId: $userId) {
    _permissions
    _databaseId
    _id
    _collectionId
    _updatedAt
    _createdAt
    userId
    myId
    username
    status
    emailVerification
    phoneVerification
    profilePictureURL
    prefs {
      termsAccepted
      location
    }
    experiences {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      userId
      imgSrc
      location
      placeDetailId
    }
  }
}
    `;
export const GetAccountWithExperiencesAndMonumentsDocument = gql`
    query getAccountWithExperiencesAndMonuments($userId: String) {
  getAccount(userId: $userId) {
    _permissions
    _databaseId
    _id
    _collectionId
    _updatedAt
    _createdAt
    userId
    myId
    username
    status
    emailVerification
    phoneVerification
    profilePictureURL
    prefs {
      location
      termsAccepted
    }
    experiences {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      userId
      imgSrc
      location
      placeDetailId
    }
    monuments {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      location
      creatorUserId
      name
      about
      pictureURL
      placeDetailId
    }
  }
}
    `;
export const GetAccountWithMonumentsDocument = gql`
    query getAccountWithMonuments($userId: String) {
  getAccount(userId: $userId) {
    _permissions
    _databaseId
    _id
    _collectionId
    _updatedAt
    _createdAt
    userId
    myId
    username
    status
    emailVerification
    phoneVerification
    profilePictureURL
    prefs {
      location
      termsAccepted
    }
    monuments {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      location
      creatorUserId
      name
      about
      pictureURL
      placeDetailId
    }
  }
}
    `;
export const GetListOfAccountsBySearchingDocument = gql`
    query getListOfAccountsBySearching($searchingText: String) {
  getAccounts(searchingText: $searchingText) {
    _createdAt
    _updatedAt
    _collectionId
    _id
    _permissions
    _databaseId
    userId
    myId
    username
    profilePictureURL
  }
}
    `;
export const GetProfileDocument = gql`
    query getProfile($myId: String!) {
  getAccountByMyId(myId: $myId) {
    _permissions
    _databaseId
    _id
    _collectionId
    _updatedAt
    _createdAt
    userId
    myId
    username
    profilePictureURL
    experiences {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      userId
      imgSrc
      location
      placeDetailId
      likes {
        _createdAt
        _updatedAt
        _collectionId
        _id
        _permissions
        _databaseId
        userId
        experienceId
        user {
          _createdAt
          _updatedAt
          _collectionId
          _id
          _permissions
          _databaseId
          userId
          myId
          username
          profilePictureURL
        }
      }
    }
    monuments {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      location
      creatorUserId
      name
      about
      topics
      placeDetailId
      pictureURL
      creator {
        _createdAt
        _updatedAt
        _collectionId
        _id
        _permissions
        _databaseId
        userId
        myId
        username
        status
        emailVerification
        phoneVerification
        profilePictureURL
      }
      placeDetail {
        _createdAt
        _updatedAt
        _collectionId
        _id
        _permissions
        _databaseId
        name
      }
      likes {
        _createdAt
        _updatedAt
        _collectionId
        _id
        _permissions
        _databaseId
        userId
        monumentId
        user {
          _id
          userId
          myId
          username
          profilePictureURL
        }
      }
      liked {
        _createdAt
        _updatedAt
        _collectionId
        _id
        _permissions
        _databaseId
        userId
        monumentId
      }
    }
  }
}
    `;
export const UpdateProfilePictureDocument = gql`
    query updateProfilePicture($picture: String!) {
  updateProfilePicture(picture: $picture) {
    _createdAt
    _updatedAt
    _collectionId
    _id
    _permissions
    _databaseId
    userId
    myId
    username
    status
    emailVerification
    phoneVerification
    profilePictureURL
    prefs {
      location
      termsAccepted
    }
  }
}
    `;
export const CreateExperienceDocument = gql`
    mutation createExperience($input: CreateExperienceInput!) {
  createExperience(input: $input) {
    _createdAt
    _updatedAt
    _collectionId
    _id
    _permissions
    _databaseId
    userId
    imgSrc
    location
    placeDetailId
  }
}
    `;
export const GetExperienceDocument = gql`
    query getExperience($getExperienceId: String!) {
  getExperience(id: $getExperienceId) {
    _createdAt
    _updatedAt
    _collectionId
    _id
    _permissions
    _databaseId
    userId
    imgSrc
    location
    placeDetailId
  }
}
    `;
export const GetExperienceWithCreatorAndHisOtherExperiencesDocument = gql`
    query getExperienceWithCreatorAndHisOtherExperiences($id: String!) {
  getExperience(id: $id) {
    _createdAt
    _updatedAt
    _collectionId
    _id
    _permissions
    _databaseId
    userId
    imgSrc
    location
    placeDetailId
    user {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      userId
      myId
      username
      profilePictureURL
      experiences {
        _createdAt
        _updatedAt
        _collectionId
        _id
        _permissions
        _databaseId
        userId
        imgSrc
        location
      }
    }
  }
}
    `;
export const GetListOfExperienceCardsDocument = gql`
    query getListOfExperienceCards {
  getListOfExperiences {
    _createdAt
    _updatedAt
    _collectionId
    _id
    _permissions
    _databaseId
    userId
    imgSrc
    location
    placeDetailId
    user {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      myId
      username
      profilePictureURL
      userId
    }
    placeDetail {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      name
    }
    liked {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      userId
      experienceId
    }
    likes {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      userId
      experienceId
      user {
        _createdAt
        _updatedAt
        _collectionId
        _id
        _permissions
        _databaseId
        userId
        myId
        username
        status
        profilePictureURL
      }
    }
  }
}
    `;
export const GetListOfExperiencesDocument = gql`
    query getListOfExperiences($input: ExperienceInput) {
  getListOfExperiences(input: $input) {
    _createdAt
    _updatedAt
    _collectionId
    _id
    _permissions
    _databaseId
    userId
    imgSrc
    location
    placeDetailId
  }
}
    `;
export const GetListOfExperiencesWithCreatorDocument = gql`
    query getListOfExperiencesWithCreator($input: ExperienceInput) {
  getListOfExperiences(input: $input) {
    _createdAt
    _updatedAt
    _collectionId
    _id
    _permissions
    _databaseId
    userId
    imgSrc
    location
    placeDetailId
    user {
      userId
      myId
      username
      profilePictureURL
    }
  }
}
    `;
export const GetListOfItemsForMapDocument = gql`
    query getListOfItemsForMap($monument: MonumentLocationInput!, $experience: ExperienceInput!) {
  getListOfExperiences(input: $experience) {
    _createdAt
    _updatedAt
    _collectionId
    _id
    _permissions
    _databaseId
    userId
    imgSrc
    location
    placeDetailId
  }
  getListOfMonumentsByLocation(input: $monument) {
    _createdAt
    _updatedAt
    _collectionId
    _id
    _permissions
    _databaseId
    location
    creatorUserId
    name
    about
    topics
    placeDetailId
    pictureURL
  }
}
    `;
export const GetListOfPlaceCardsDocument = gql`
    query getListOfPlaceCards {
  getListOfMonuments {
    _createdAt
    _updatedAt
    _collectionId
    _id
    _permissions
    _databaseId
    location
    creatorUserId
    name
    about
    placeDetailId
    pictureURL
    creator {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      userId
      myId
      username
      status
      emailVerification
      phoneVerification
      profilePictureURL
    }
    placeDetail {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      name
    }
    likes {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      userId
      monumentId
      user {
        _id
        userId
        myId
        username
        profilePictureURL
      }
    }
    liked {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      userId
      monumentId
    }
  }
  getListOfExperiences {
    _createdAt
    _updatedAt
    _collectionId
    _id
    _permissions
    _databaseId
    userId
    imgSrc
    location
    placeDetailId
    user {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      myId
      username
      profilePictureURL
      userId
    }
    placeDetail {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      name
    }
    liked {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      userId
      experienceId
    }
    likes {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      userId
      experienceId
      user {
        _createdAt
        _updatedAt
        _collectionId
        _id
        _permissions
        _databaseId
        userId
        myId
        username
        status
        profilePictureURL
      }
    }
  }
}
    `;
export const LikeMonumentDocument = gql`
    mutation likeMonument($monumentId: String!) {
  likeMonument(monumentId: $monumentId) {
    _createdAt
    _updatedAt
    _collectionId
    _id
    _permissions
    _databaseId
    userId
    monumentId
  }
}
    `;
export const CreateMonumentDocument = gql`
    mutation createMonument($input: CreateMonumentInput!) {
  createMonument(input: $input) {
    _createdAt
    _updatedAt
    _collectionId
    _id
    _permissions
    _databaseId
    location
    creatorUserId
    name
    about
    topics
    pictureURL
    placeDetailId
    placeDetail {
      name
      _databaseId
      _permissions
      _id
      _collectionId
      _updatedAt
      _createdAt
    }
  }
}
    `;
export const DeleteMonumentDocument = gql`
    mutation deleteMonument($monumentId: String!) {
  deleteMonument(monumentId: $monumentId)
}
    `;
export const GetListOfMonumentCardsDocument = gql`
    query getListOfMonumentCards {
  getListOfMonuments {
    _createdAt
    _updatedAt
    _collectionId
    _id
    _permissions
    _databaseId
    location
    creatorUserId
    name
    about
    topics
    placeDetailId
    pictureURL
    creator {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      userId
      myId
      username
      status
      emailVerification
      phoneVerification
      profilePictureURL
    }
    placeDetail {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      name
    }
    likes {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      userId
      monumentId
      user {
        _id
        userId
        myId
        username
        profilePictureURL
      }
    }
    liked {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      userId
      monumentId
    }
  }
}
    `;
export const GetListOfMonumentCardsByLocationDocument = gql`
    query getListOfMonumentCardsByLocation($input: MonumentLocationInput!) {
  getListOfMonumentsByLocation(input: $input) {
    _createdAt
    _updatedAt
    _collectionId
    _id
    _permissions
    _databaseId
    location
    topics
    creatorUserId
    name
    about
    placeDetailId
    pictureURL
    creator {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      userId
      myId
      username
      status
      emailVerification
      phoneVerification
      profilePictureURL
    }
    placeDetail {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      name
    }
    likes {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      userId
      monumentId
      user {
        _id
        userId
        myId
        username
        profilePictureURL
      }
    }
    liked {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      userId
      monumentId
    }
  }
}
    `;
export const GetListOfMonumentCardsByLocationAndTopicsDocument = gql`
    query getListOfMonumentCardsByLocationAndTopics($input: MonumentLocationAndTopicsInput!) {
  getListOfMonumentsByLocationAndTopics(input: $input) {
    _createdAt
    _updatedAt
    _collectionId
    _id
    _permissions
    _databaseId
    location
    creatorUserId
    name
    about
    topics
    placeDetailId
    pictureURL
    creator {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      userId
      myId
      username
      status
      emailVerification
      phoneVerification
      profilePictureURL
    }
    placeDetail {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      name
    }
    likes {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      userId
      monumentId
      user {
        _id
        userId
        myId
        username
        profilePictureURL
      }
    }
    liked {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      userId
      monumentId
    }
  }
}
    `;
export const GetListOfMonumentCardsBySearchingNameDocument = gql`
    query getListOfMonumentCardsBySearchingName($input: MonumentInputByName!) {
  getListOfMonumentsSearchByName(input: $input) {
    _createdAt
    _updatedAt
    _collectionId
    _id
    _permissions
    _databaseId
    location
    creatorUserId
    topics
    name
    about
    placeDetailId
    pictureURL
    creator {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      userId
      myId
      username
      status
      emailVerification
      phoneVerification
      profilePictureURL
    }
    placeDetail {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      name
    }
    likes {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      userId
      monumentId
      user {
        _id
        userId
        myId
        username
        profilePictureURL
      }
    }
    liked {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      userId
      monumentId
    }
  }
}
    `;
export const GetMonumentDocument = gql`
    query getMonument($id: String!) {
  getMonument(id: $id) {
    _createdAt
    _updatedAt
    _collectionId
    _id
    _permissions
    _databaseId
    location
    creatorUserId
    name
    topics
    about
    placeDetailId
    pictureURL
    placeDetail {
      name
      _databaseId
      _permissions
      _id
      _collectionId
      _updatedAt
      _createdAt
    }
  }
}
    `;
export const GetMonumentWithCreatorAndNearestListOfExperienceDocument = gql`
    query getMonumentWithCreatorAndNearestListOfExperience($id: String!) {
  getMonument(id: $id) {
    _createdAt
    _updatedAt
    _collectionId
    _id
    _permissions
    _databaseId
    location
    topics
    creatorUserId
    name
    about
    placeDetailId
    pictureURL
    creator {
      _permissions
      _databaseId
      _id
      _collectionId
      _updatedAt
      _createdAt
      userId
      myId
      username
      status
      emailVerification
      phoneVerification
      profilePictureURL
    }
    nearExperiences {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      userId
      imgSrc
      location
      placeDetailId
    }
    placeDetail {
      name
      _databaseId
      _permissions
      _id
      _collectionId
      _updatedAt
      _createdAt
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    createAccount(variables: CreateAccountQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateAccountQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateAccountQuery>(CreateAccountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createAccount', 'query');
    },
    loginViaEmail(variables: LoginViaEmailQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<LoginViaEmailQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<LoginViaEmailQuery>(LoginViaEmailDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'loginViaEmail', 'query');
    },
    getAccount(variables?: GetAccountQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAccountQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAccountQuery>(GetAccountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAccount', 'query');
    },
    getAccountByMyId(variables: GetAccountByMyIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAccountByMyIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAccountByMyIdQuery>(GetAccountByMyIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAccountByMyId', 'query');
    },
    getAccountWithExperiences(variables?: GetAccountWithExperiencesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAccountWithExperiencesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAccountWithExperiencesQuery>(GetAccountWithExperiencesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAccountWithExperiences', 'query');
    },
    getAccountWithExperiencesAndMonuments(variables?: GetAccountWithExperiencesAndMonumentsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAccountWithExperiencesAndMonumentsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAccountWithExperiencesAndMonumentsQuery>(GetAccountWithExperiencesAndMonumentsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAccountWithExperiencesAndMonuments', 'query');
    },
    getAccountWithMonuments(variables?: GetAccountWithMonumentsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAccountWithMonumentsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAccountWithMonumentsQuery>(GetAccountWithMonumentsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAccountWithMonuments', 'query');
    },
    getListOfAccountsBySearching(variables?: GetListOfAccountsBySearchingQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetListOfAccountsBySearchingQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetListOfAccountsBySearchingQuery>(GetListOfAccountsBySearchingDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getListOfAccountsBySearching', 'query');
    },
    getProfile(variables: GetProfileQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetProfileQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProfileQuery>(GetProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProfile', 'query');
    },
    updateProfilePicture(variables: UpdateProfilePictureQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateProfilePictureQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateProfilePictureQuery>(UpdateProfilePictureDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateProfilePicture', 'query');
    },
    createExperience(variables: CreateExperienceMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateExperienceMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateExperienceMutation>(CreateExperienceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createExperience', 'mutation');
    },
    getExperience(variables: GetExperienceQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetExperienceQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetExperienceQuery>(GetExperienceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getExperience', 'query');
    },
    getExperienceWithCreatorAndHisOtherExperiences(variables: GetExperienceWithCreatorAndHisOtherExperiencesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetExperienceWithCreatorAndHisOtherExperiencesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetExperienceWithCreatorAndHisOtherExperiencesQuery>(GetExperienceWithCreatorAndHisOtherExperiencesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getExperienceWithCreatorAndHisOtherExperiences', 'query');
    },
    getListOfExperienceCards(variables?: GetListOfExperienceCardsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetListOfExperienceCardsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetListOfExperienceCardsQuery>(GetListOfExperienceCardsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getListOfExperienceCards', 'query');
    },
    getListOfExperiences(variables?: GetListOfExperiencesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetListOfExperiencesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetListOfExperiencesQuery>(GetListOfExperiencesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getListOfExperiences', 'query');
    },
    getListOfExperiencesWithCreator(variables?: GetListOfExperiencesWithCreatorQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetListOfExperiencesWithCreatorQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetListOfExperiencesWithCreatorQuery>(GetListOfExperiencesWithCreatorDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getListOfExperiencesWithCreator', 'query');
    },
    getListOfItemsForMap(variables: GetListOfItemsForMapQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetListOfItemsForMapQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetListOfItemsForMapQuery>(GetListOfItemsForMapDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getListOfItemsForMap', 'query');
    },
    getListOfPlaceCards(variables?: GetListOfPlaceCardsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetListOfPlaceCardsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetListOfPlaceCardsQuery>(GetListOfPlaceCardsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getListOfPlaceCards', 'query');
    },
    likeMonument(variables: LikeMonumentMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<LikeMonumentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LikeMonumentMutation>(LikeMonumentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'likeMonument', 'mutation');
    },
    createMonument(variables: CreateMonumentMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateMonumentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateMonumentMutation>(CreateMonumentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createMonument', 'mutation');
    },
    deleteMonument(variables: DeleteMonumentMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteMonumentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteMonumentMutation>(DeleteMonumentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteMonument', 'mutation');
    },
    getListOfMonumentCards(variables?: GetListOfMonumentCardsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetListOfMonumentCardsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetListOfMonumentCardsQuery>(GetListOfMonumentCardsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getListOfMonumentCards', 'query');
    },
    getListOfMonumentCardsByLocation(variables: GetListOfMonumentCardsByLocationQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetListOfMonumentCardsByLocationQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetListOfMonumentCardsByLocationQuery>(GetListOfMonumentCardsByLocationDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getListOfMonumentCardsByLocation', 'query');
    },
    getListOfMonumentCardsByLocationAndTopics(variables: GetListOfMonumentCardsByLocationAndTopicsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetListOfMonumentCardsByLocationAndTopicsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetListOfMonumentCardsByLocationAndTopicsQuery>(GetListOfMonumentCardsByLocationAndTopicsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getListOfMonumentCardsByLocationAndTopics', 'query');
    },
    getListOfMonumentCardsBySearchingName(variables: GetListOfMonumentCardsBySearchingNameQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetListOfMonumentCardsBySearchingNameQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetListOfMonumentCardsBySearchingNameQuery>(GetListOfMonumentCardsBySearchingNameDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getListOfMonumentCardsBySearchingName', 'query');
    },
    getMonument(variables: GetMonumentQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetMonumentQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMonumentQuery>(GetMonumentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getMonument', 'query');
    },
    getMonumentWithCreatorAndNearestListOfExperience(variables: GetMonumentWithCreatorAndNearestListOfExperienceQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetMonumentWithCreatorAndNearestListOfExperienceQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMonumentWithCreatorAndNearestListOfExperienceQuery>(GetMonumentWithCreatorAndNearestListOfExperienceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getMonumentWithCreatorAndNearestListOfExperience', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;