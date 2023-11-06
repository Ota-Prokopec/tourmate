import client from "./client";
import type {
        ApolloQueryResult, ObservableQuery, WatchQueryOptions, MutationOptions
      } from "@apollo/client";
import { readable } from "svelte/store";
import type { Readable } from "svelte/store";
import gql from "graphql-tag"
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
  Transport: { input: any; output: any; }
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
  emailVerification: Scalars['Boolean']['output'];
  experiences: Array<Experience>;
  monuments: Array<Monument>;
  myId: Scalars['String']['output'];
  phoneVerification: Scalars['Boolean']['output'];
  prefs: UsersPreferences;
  /** This is URL of profile picture. Not its id. */
  profilePictureURL: Scalars['URL']['output'];
  status: Scalars['Boolean']['output'];
  userId: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type CreateAccountInput = {
  myId: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreateExperienceInput = {
  connnectedMonumentId: Scalars['String']['input'];
  location: Scalars['Location']['input'];
  picture: Scalars['String']['input'];
};

export type CreateMonumentInput = {
  about: Scalars['String']['input'];
  location: Scalars['Location']['input'];
  name: Scalars['String']['input'];
  picture?: InputMaybe<Scalars['String']['input']>;
  placeName: Scalars['String']['input'];
  topics: Array<Scalars['Topic']['input']>;
  transports: Array<Scalars['Transport']['input']>;
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
  connectedMonument: Monument;
  connectedMonumentId: Scalars['String']['output'];
  imgSrc: Scalars['URL']['output'];
  liked?: Maybe<ExperienceLike>;
  likes: Array<ExperienceLike>;
  location: Scalars['Location']['output'];
  user: Account;
  userId: Scalars['String']['output'];
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

export type LocationInput = {
  location: Scalars['Location']['input'];
  range?: InputMaybe<Scalars['Float']['input']>;
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
  connectedExperiences: Array<Experience>;
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
  transports: Array<Scalars['Transport']['output']>;
  user: Account;
  userId: Scalars['String']['output'];
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

export type Mutation = {
  __typename?: 'Mutation';
  createExperience: Experience;
  createMonument: Monument;
  deleteExperience: Scalars['Boolean']['output'];
  deleteMonument: Scalars['Boolean']['output'];
  likeExperience: ExperienceLike;
  likeMonument: MonumentLike;
};


export type MutationCreateExperienceArgs = {
  input: CreateExperienceInput;
};


export type MutationCreateMonumentArgs = {
  input: CreateMonumentInput;
};


export type MutationDeleteExperienceArgs = {
  experienceId: Scalars['String']['input'];
};


export type MutationDeleteMonumentArgs = {
  monumentId: Scalars['String']['input'];
};


export type MutationLikeExperienceArgs = {
  experienceId: Scalars['String']['input'];
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
  getAccounts: Array<Account>;
  getExperience: Experience;
  getListOfExperiences: Array<Experience>;
  getListOfMonuments: Array<Monument>;
  getMonument: Monument;
  logInViaEmail: EmailLogin;
  updateProfilePicture: Account;
};


export type QueryCreateAccountArgs = {
  myId: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type QueryGetAccountArgs = {
  myId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetAccountsArgs = {
  searchingText?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetExperienceArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetListOfExperiencesArgs = {
  location?: InputMaybe<LocationInput>;
};


export type QueryGetListOfMonumentsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  location?: InputMaybe<LocationInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  topics?: InputMaybe<Array<Scalars['Topic']['input']>>;
  transports?: InputMaybe<Array<Scalars['Transport']['input']>>;
  userId?: InputMaybe<Scalars['String']['input']>;
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
  mapRange: Scalars['Int']['output'];
  termsAccepted: Scalars['Boolean']['output'];
};

export type CreateAccountQueryVariables = Exact<{
  myId: Scalars['String']['input'];
  username: Scalars['String']['input'];
}>;


export type CreateAccountQuery = { __typename?: 'Query', createAccount: { __typename?: 'Account', _updatedAt: string, _createdAt: string, userId: string, myId: string, username: string, status: boolean, emailVerification: boolean, phoneVerification: boolean, prefs: { __typename?: 'UsersPreferences', mapRange: number, termsAccepted: boolean } } };

export type GetAccountQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAccountQuery = { __typename?: 'Query', getAccount: { __typename?: 'Account', _permissions: Array<string>, _databaseId: string, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string, userId: string, myId: string, username: string, status: boolean, emailVerification: boolean, phoneVerification: boolean, profilePictureURL: URL, prefs: { __typename?: 'UsersPreferences', mapRange: number, termsAccepted: boolean } } };

export type GetAccountByMyIdQueryVariables = Exact<{
  myId: Scalars['String']['input'];
}>;


export type GetAccountByMyIdQuery = { __typename?: 'Query', getAccount: { __typename?: 'Account', _permissions: Array<string>, _databaseId: string, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string, userId: string, myId: string, username: string, status: boolean, emailVerification: boolean, phoneVerification: boolean, profilePictureURL: URL, prefs: { __typename?: 'UsersPreferences', mapRange: number, termsAccepted: boolean } } };

export type GetListOfAccountsBySearchingQueryVariables = Exact<{
  searchingText?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetListOfAccountsBySearchingQuery = { __typename?: 'Query', getAccounts: Array<{ __typename?: 'Account', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: URL }> };

export type GetProfileQueryVariables = Exact<{
  myId: Scalars['String']['input'];
}>;


export type GetProfileQuery = { __typename?: 'Query', getAccount: { __typename?: 'Account', _permissions: Array<string>, _databaseId: string, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string, userId: string, myId: string, username: string, profilePictureURL: URL, experiences: Array<{ __typename?: 'Experience', connectedMonumentId: string, location: [number, number], imgSrc: URL, userId: string, _databaseId: string, _permissions: Array<string>, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string, liked?: { __typename?: 'ExperienceLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, experienceId: string } | null, likes: Array<{ __typename?: 'ExperienceLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, experienceId: string, user: { __typename?: 'Account', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: URL } }>, user: { __typename?: 'Account', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: URL }, connectedMonument: { __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], userId: string, name: string, about?: string | null, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, placeDetailId: string, transports: Array<any>, pictureURL?: URL | null, user: { __typename?: 'Account', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: URL }, placeDetail: { __typename?: 'PlaceDetail', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, name: string }, likes: Array<{ __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string, user: { __typename?: 'Account', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: URL } }>, liked?: { __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string } | null } }> } };

export type LoginViaEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginViaEmailQuery = { __typename?: 'Query', logInViaEmail: { __typename?: 'EmailLogin', session: string } };

export type UpdateProfilePictureQueryVariables = Exact<{
  picture: Scalars['String']['input'];
}>;


export type UpdateProfilePictureQuery = { __typename?: 'Query', updateProfilePicture: { __typename?: 'Account', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, status: boolean, emailVerification: boolean, phoneVerification: boolean, profilePictureURL: URL, prefs: { __typename?: 'UsersPreferences', mapRange: number, termsAccepted: boolean } } };

export type CreateExperienceMutationVariables = Exact<{
  input: CreateExperienceInput;
}>;


export type CreateExperienceMutation = { __typename?: 'Mutation', createExperience: { __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, imgSrc: URL, location: [number, number] } };

export type DeleteExperienceMutationVariables = Exact<{
  experienceId: Scalars['String']['input'];
}>;


export type DeleteExperienceMutation = { __typename?: 'Mutation', deleteExperience: boolean };

export type GetExperienceQueryVariables = Exact<{
  getExperienceId: Scalars['String']['input'];
}>;


export type GetExperienceQuery = { __typename?: 'Query', getExperience: { __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, imgSrc: URL, location: [number, number] } };

export type GetListOfExperienceCardsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListOfExperienceCardsQuery = { __typename?: 'Query', getListOfExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, imgSrc: URL, location: [number, number], user: { __typename?: 'Account', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, myId: string, username: string, profilePictureURL: URL, userId: string }, liked?: { __typename?: 'ExperienceLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, experienceId: string } | null, likes: Array<{ __typename?: 'ExperienceLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, experienceId: string, user: { __typename?: 'Account', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, status: boolean, profilePictureURL: URL } }> }> };

export type GetListOfExperiencesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListOfExperiencesQuery = { __typename?: 'Query', getListOfExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, imgSrc: URL, location: [number, number] }> };

export type GetListOfItemsForMapQueryVariables = Exact<{
  transports?: InputMaybe<Array<Scalars['Transport']['input']> | Scalars['Transport']['input']>;
  topics?: InputMaybe<Array<Scalars['Topic']['input']> | Scalars['Topic']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  location?: InputMaybe<LocationInput>;
}>;


export type GetListOfItemsForMapQuery = { __typename?: 'Query', getListOfExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, imgSrc: URL, connectedMonumentId: string, location: [number, number], user: { __typename?: 'Account', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: URL } }>, getListOfMonuments: Array<{ __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], transports: Array<any>, userId: string, name: string, about?: string | null, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, placeDetailId: string, pictureURL?: URL | null, user: { __typename?: 'Account', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: URL } }> };

export type GetListOfPlaceCardsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListOfPlaceCardsQuery = { __typename?: 'Query', getListOfMonuments: Array<{ __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, transports: Array<any>, location: [number, number], userId: string, name: string, about?: string | null, placeDetailId: string, pictureURL?: URL | null, user: { __typename?: 'Account', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, status: boolean, emailVerification: boolean, phoneVerification: boolean, profilePictureURL: URL }, placeDetail: { __typename?: 'PlaceDetail', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, name: string }, likes: Array<{ __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string, user: { __typename?: 'Account', _id: string, userId: string, myId: string, username: string, profilePictureURL: URL } }>, liked?: { __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string } | null }>, getListOfExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, imgSrc: URL, location: [number, number], user: { __typename?: 'Account', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, myId: string, username: string, profilePictureURL: URL, userId: string }, liked?: { __typename?: 'ExperienceLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, experienceId: string } | null, likes: Array<{ __typename?: 'ExperienceLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, experienceId: string, user: { __typename?: 'Account', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, status: boolean, profilePictureURL: URL } }> }> };

export type LikeExperienceMutationVariables = Exact<{
  experienceId: Scalars['String']['input'];
}>;


export type LikeExperienceMutation = { __typename?: 'Mutation', likeExperience: { __typename?: 'ExperienceLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, experienceId: string } };

export type LikeMonumentMutationVariables = Exact<{
  monumentId: Scalars['String']['input'];
}>;


export type LikeMonumentMutation = { __typename?: 'Mutation', likeMonument: { __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string } };

export type CreateMonumentMutationVariables = Exact<{
  input: CreateMonumentInput;
}>;


export type CreateMonumentMutation = { __typename?: 'Mutation', createMonument: { __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], userId: string, name: string, about?: string | null, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, pictureURL?: URL | null, placeDetailId: string, transports: Array<any>, placeDetail: { __typename?: 'PlaceDetail', name: string, _databaseId: string, _permissions: Array<string>, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string } } };

export type DeleteMonumentMutationVariables = Exact<{
  monumentId: Scalars['String']['input'];
}>;


export type DeleteMonumentMutation = { __typename?: 'Mutation', deleteMonument: boolean };

export type GetListOfMonumentCardsQueryVariables = Exact<{
  location?: InputMaybe<LocationInput>;
  topics?: InputMaybe<Array<Scalars['Topic']['input']> | Scalars['Topic']['input']>;
  transports?: InputMaybe<Array<Scalars['Transport']['input']> | Scalars['Transport']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetListOfMonumentCardsQuery = { __typename?: 'Query', getListOfMonuments: Array<{ __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], userId: string, name: string, about?: string | null, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, placeDetailId: string, pictureURL?: URL | null, transports: Array<any>, user: { __typename?: 'Account', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, status: boolean, emailVerification: boolean, phoneVerification: boolean, profilePictureURL: URL }, placeDetail: { __typename?: 'PlaceDetail', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, name: string }, likes: Array<{ __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string, user: { __typename?: 'Account', _id: string, userId: string, myId: string, username: string, profilePictureURL: URL } }>, liked?: { __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string } | null }> };

export type GetListOfMonumentsForMapQueryVariables = Exact<{
  transports?: InputMaybe<Array<Scalars['Transport']['input']> | Scalars['Transport']['input']>;
  topics?: InputMaybe<Array<Scalars['Topic']['input']> | Scalars['Topic']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  location?: InputMaybe<LocationInput>;
}>;


export type GetListOfMonumentsForMapQuery = { __typename?: 'Query', getListOfMonuments: Array<{ __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], transports: Array<any>, userId: string, name: string, about?: string | null, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, placeDetailId: string, pictureURL?: URL | null }> };

export type GetMonumentQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetMonumentQuery = { __typename?: 'Query', getMonument: { __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], userId: string, name: string, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, about?: string | null, placeDetailId: string, pictureURL?: URL | null, transports: Array<any>, placeDetail: { __typename?: 'PlaceDetail', name: string, _databaseId: string, _permissions: Array<string>, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string } } };

export type GetMonumentCardQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetMonumentCardQuery = { __typename?: 'Query', getMonument: { __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], userId: string, name: string, about?: string | null, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, placeDetailId: string, pictureURL?: URL | null, transports: Array<any>, user: { __typename?: 'Account', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, status: boolean, emailVerification: boolean, phoneVerification: boolean, profilePictureURL: URL }, placeDetail: { __typename?: 'PlaceDetail', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, name: string }, likes: Array<{ __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string, user: { __typename?: 'Account', _id: string, userId: string, myId: string, username: string, profilePictureURL: URL } }>, liked?: { __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string } | null } };

export type GetMonumentCardWithConnectedExperiencesQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetMonumentCardWithConnectedExperiencesQuery = { __typename?: 'Query', getMonument: { __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], userId: string, name: string, about?: string | null, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, placeDetailId: string, pictureURL?: URL | null, transports: Array<any>, user: { __typename?: 'Account', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, status: boolean, emailVerification: boolean, phoneVerification: boolean, profilePictureURL: URL }, placeDetail: { __typename?: 'PlaceDetail', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, name: string }, likes: Array<{ __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string, user: { __typename?: 'Account', _id: string, userId: string, myId: string, username: string, profilePictureURL: URL } }>, liked?: { __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string } | null, connectedExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, imgSrc: URL, location: [number, number], connectedMonumentId: string, user: { __typename?: 'Account', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: URL }, likes: Array<{ __typename?: 'ExperienceLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, experienceId: string, user: { __typename?: 'Account', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: URL } }>, liked?: { __typename?: 'ExperienceLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, experienceId: string } | null }> } };


export const CreateAccountDoc = gql`
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
      mapRange
      termsAccepted
    }
  }
}
    `;
export const GetAccountDoc = gql`
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
      mapRange
      termsAccepted
    }
  }
}
    `;
export const GetAccountByMyIdDoc = gql`
    query getAccountByMyId($myId: String!) {
  getAccount(myId: $myId) {
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
      mapRange
      termsAccepted
    }
  }
}
    `;
export const GetListOfAccountsBySearchingDoc = gql`
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
export const GetProfileDoc = gql`
    query getProfile($myId: String!) {
  getAccount(myId: $myId) {
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
          profilePictureURL
        }
      }
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
      connectedMonumentId
      location
      imgSrc
      userId
      _databaseId
      _permissions
      _id
      _collectionId
      _updatedAt
      _createdAt
      connectedMonument {
        _createdAt
        _updatedAt
        _collectionId
        _id
        _permissions
        _databaseId
        location
        userId
        name
        about
        topics
        placeDetailId
        transports
        pictureURL
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
}
    `;
export const LoginViaEmailDoc = gql`
    query loginViaEmail($email: String!, $password: String!) {
  logInViaEmail(email: $email, password: $password) {
    session
  }
}
    `;
export const UpdateProfilePictureDoc = gql`
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
      mapRange
      termsAccepted
    }
  }
}
    `;
export const CreateExperienceDoc = gql`
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
  }
}
    `;
export const DeleteExperienceDoc = gql`
    mutation deleteExperience($experienceId: String!) {
  deleteExperience(experienceId: $experienceId)
}
    `;
export const GetExperienceDoc = gql`
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
  }
}
    `;
export const GetListOfExperienceCardsDoc = gql`
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
export const GetListOfExperiencesDoc = gql`
    query getListOfExperiences {
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
  }
}
    `;
export const GetListOfItemsForMapDoc = gql`
    query getListOfItemsForMap($transports: [Transport!], $topics: [Topic!], $name: String, $limit: Int, $location: LocationInput) {
  getListOfExperiences(location: $location) {
    _createdAt
    _updatedAt
    _collectionId
    _id
    _permissions
    _databaseId
    userId
    imgSrc
    connectedMonumentId
    location
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
  getListOfMonuments(
    transports: $transports
    topics: $topics
    name: $name
    limit: $limit
    location: $location
  ) {
    _createdAt
    _updatedAt
    _collectionId
    _id
    _permissions
    _databaseId
    location
    transports
    userId
    name
    about
    topics
    placeDetailId
    pictureURL
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
    `;
export const GetListOfPlaceCardsDoc = gql`
    query getListOfPlaceCards {
  getListOfMonuments {
    _createdAt
    _updatedAt
    _collectionId
    _id
    _permissions
    _databaseId
    transports
    location
    userId
    name
    about
    placeDetailId
    pictureURL
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
export const LikeExperienceDoc = gql`
    mutation likeExperience($experienceId: String!) {
  likeExperience(experienceId: $experienceId) {
    _createdAt
    _updatedAt
    _collectionId
    _id
    _permissions
    _databaseId
    userId
    experienceId
  }
}
    `;
export const LikeMonumentDoc = gql`
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
export const CreateMonumentDoc = gql`
    mutation createMonument($input: CreateMonumentInput!) {
  createMonument(input: $input) {
    _createdAt
    _updatedAt
    _collectionId
    _id
    _permissions
    _databaseId
    location
    userId
    name
    about
    topics
    pictureURL
    placeDetailId
    transports
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
export const DeleteMonumentDoc = gql`
    mutation deleteMonument($monumentId: String!) {
  deleteMonument(monumentId: $monumentId)
}
    `;
export const GetListOfMonumentCardsDoc = gql`
    query getListOfMonumentCards($location: LocationInput, $topics: [Topic!], $transports: [Transport!], $name: String, $limit: Int, $userId: String) {
  getListOfMonuments(
    location: $location
    topics: $topics
    transports: $transports
    name: $name
    limit: $limit
    userId: $userId
  ) {
    _createdAt
    _updatedAt
    _collectionId
    _id
    _permissions
    _databaseId
    location
    userId
    name
    about
    topics
    placeDetailId
    pictureURL
    transports
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
export const GetListOfMonumentsForMapDoc = gql`
    query getListOfMonumentsForMap($transports: [Transport!], $topics: [Topic!], $name: String, $limit: Int, $location: LocationInput) {
  getListOfMonuments(
    transports: $transports
    topics: $topics
    name: $name
    limit: $limit
    location: $location
  ) {
    _createdAt
    _updatedAt
    _collectionId
    _id
    _permissions
    _databaseId
    location
    transports
    userId
    name
    about
    topics
    placeDetailId
    pictureURL
  }
}
    `;
export const GetMonumentDoc = gql`
    query getMonument($id: String!) {
  getMonument(id: $id) {
    _createdAt
    _updatedAt
    _collectionId
    _id
    _permissions
    _databaseId
    location
    userId
    name
    topics
    about
    placeDetailId
    pictureURL
    transports
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
export const GetMonumentCardDoc = gql`
    query getMonumentCard($id: String!) {
  getMonument(id: $id) {
    _createdAt
    _updatedAt
    _collectionId
    _id
    _permissions
    _databaseId
    location
    userId
    name
    about
    topics
    placeDetailId
    pictureURL
    transports
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
export const GetMonumentCardWithConnectedExperiencesDoc = gql`
    query getMonumentCardWithConnectedExperiences($id: String!) {
  getMonument(id: $id) {
    _createdAt
    _updatedAt
    _collectionId
    _id
    _permissions
    _databaseId
    location
    userId
    name
    about
    topics
    placeDetailId
    pictureURL
    transports
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
    connectedExperiences {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      userId
      imgSrc
      location
      connectedMonumentId
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
    }
  }
}
    `;
export const createAccount = (
            options: Omit<
              WatchQueryOptions<CreateAccountQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<CreateAccountQuery> & {
              query: ObservableQuery<
                CreateAccountQuery,
                CreateAccountQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: CreateAccountDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<CreateAccountQuery> & {
                query: ObservableQuery<
                  CreateAccountQuery,
                  CreateAccountQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        
export const getAccount = (
            options: Omit<
              WatchQueryOptions<GetAccountQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetAccountQuery> & {
              query: ObservableQuery<
                GetAccountQuery,
                GetAccountQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetAccountDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetAccountQuery> & {
                query: ObservableQuery<
                  GetAccountQuery,
                  GetAccountQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        
export const getAccountByMyId = (
            options: Omit<
              WatchQueryOptions<GetAccountByMyIdQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetAccountByMyIdQuery> & {
              query: ObservableQuery<
                GetAccountByMyIdQuery,
                GetAccountByMyIdQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetAccountByMyIdDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetAccountByMyIdQuery> & {
                query: ObservableQuery<
                  GetAccountByMyIdQuery,
                  GetAccountByMyIdQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        
export const getListOfAccountsBySearching = (
            options: Omit<
              WatchQueryOptions<GetListOfAccountsBySearchingQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetListOfAccountsBySearchingQuery> & {
              query: ObservableQuery<
                GetListOfAccountsBySearchingQuery,
                GetListOfAccountsBySearchingQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetListOfAccountsBySearchingDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetListOfAccountsBySearchingQuery> & {
                query: ObservableQuery<
                  GetListOfAccountsBySearchingQuery,
                  GetListOfAccountsBySearchingQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        
export const getProfile = (
            options: Omit<
              WatchQueryOptions<GetProfileQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetProfileQuery> & {
              query: ObservableQuery<
                GetProfileQuery,
                GetProfileQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetProfileDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetProfileQuery> & {
                query: ObservableQuery<
                  GetProfileQuery,
                  GetProfileQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        
export const loginViaEmail = (
            options: Omit<
              WatchQueryOptions<LoginViaEmailQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<LoginViaEmailQuery> & {
              query: ObservableQuery<
                LoginViaEmailQuery,
                LoginViaEmailQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: LoginViaEmailDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<LoginViaEmailQuery> & {
                query: ObservableQuery<
                  LoginViaEmailQuery,
                  LoginViaEmailQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        
export const updateProfilePicture = (
            options: Omit<
              WatchQueryOptions<UpdateProfilePictureQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<UpdateProfilePictureQuery> & {
              query: ObservableQuery<
                UpdateProfilePictureQuery,
                UpdateProfilePictureQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: UpdateProfilePictureDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<UpdateProfilePictureQuery> & {
                query: ObservableQuery<
                  UpdateProfilePictureQuery,
                  UpdateProfilePictureQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        
export const createExperience = (
            options: Omit<
              MutationOptions<any, CreateExperienceMutationVariables>, 
              "mutation"
            >
          ) => {
            const m = client.mutate<CreateExperienceMutation, CreateExperienceMutationVariables>({
              mutation: CreateExperienceDoc,
              ...options,
            });
            return m;
          }
export const deleteExperience = (
            options: Omit<
              MutationOptions<any, DeleteExperienceMutationVariables>, 
              "mutation"
            >
          ) => {
            const m = client.mutate<DeleteExperienceMutation, DeleteExperienceMutationVariables>({
              mutation: DeleteExperienceDoc,
              ...options,
            });
            return m;
          }
export const getExperience = (
            options: Omit<
              WatchQueryOptions<GetExperienceQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetExperienceQuery> & {
              query: ObservableQuery<
                GetExperienceQuery,
                GetExperienceQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetExperienceDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetExperienceQuery> & {
                query: ObservableQuery<
                  GetExperienceQuery,
                  GetExperienceQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        
export const getListOfExperienceCards = (
            options: Omit<
              WatchQueryOptions<GetListOfExperienceCardsQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetListOfExperienceCardsQuery> & {
              query: ObservableQuery<
                GetListOfExperienceCardsQuery,
                GetListOfExperienceCardsQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetListOfExperienceCardsDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetListOfExperienceCardsQuery> & {
                query: ObservableQuery<
                  GetListOfExperienceCardsQuery,
                  GetListOfExperienceCardsQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        
export const getListOfExperiences = (
            options: Omit<
              WatchQueryOptions<GetListOfExperiencesQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetListOfExperiencesQuery> & {
              query: ObservableQuery<
                GetListOfExperiencesQuery,
                GetListOfExperiencesQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetListOfExperiencesDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetListOfExperiencesQuery> & {
                query: ObservableQuery<
                  GetListOfExperiencesQuery,
                  GetListOfExperiencesQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        
export const getListOfItemsForMap = (
            options: Omit<
              WatchQueryOptions<GetListOfItemsForMapQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetListOfItemsForMapQuery> & {
              query: ObservableQuery<
                GetListOfItemsForMapQuery,
                GetListOfItemsForMapQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetListOfItemsForMapDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetListOfItemsForMapQuery> & {
                query: ObservableQuery<
                  GetListOfItemsForMapQuery,
                  GetListOfItemsForMapQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        
export const getListOfPlaceCards = (
            options: Omit<
              WatchQueryOptions<GetListOfPlaceCardsQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetListOfPlaceCardsQuery> & {
              query: ObservableQuery<
                GetListOfPlaceCardsQuery,
                GetListOfPlaceCardsQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetListOfPlaceCardsDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetListOfPlaceCardsQuery> & {
                query: ObservableQuery<
                  GetListOfPlaceCardsQuery,
                  GetListOfPlaceCardsQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        
export const likeExperience = (
            options: Omit<
              MutationOptions<any, LikeExperienceMutationVariables>, 
              "mutation"
            >
          ) => {
            const m = client.mutate<LikeExperienceMutation, LikeExperienceMutationVariables>({
              mutation: LikeExperienceDoc,
              ...options,
            });
            return m;
          }
export const likeMonument = (
            options: Omit<
              MutationOptions<any, LikeMonumentMutationVariables>, 
              "mutation"
            >
          ) => {
            const m = client.mutate<LikeMonumentMutation, LikeMonumentMutationVariables>({
              mutation: LikeMonumentDoc,
              ...options,
            });
            return m;
          }
export const createMonument = (
            options: Omit<
              MutationOptions<any, CreateMonumentMutationVariables>, 
              "mutation"
            >
          ) => {
            const m = client.mutate<CreateMonumentMutation, CreateMonumentMutationVariables>({
              mutation: CreateMonumentDoc,
              ...options,
            });
            return m;
          }
export const deleteMonument = (
            options: Omit<
              MutationOptions<any, DeleteMonumentMutationVariables>, 
              "mutation"
            >
          ) => {
            const m = client.mutate<DeleteMonumentMutation, DeleteMonumentMutationVariables>({
              mutation: DeleteMonumentDoc,
              ...options,
            });
            return m;
          }
export const getListOfMonumentCards = (
            options: Omit<
              WatchQueryOptions<GetListOfMonumentCardsQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetListOfMonumentCardsQuery> & {
              query: ObservableQuery<
                GetListOfMonumentCardsQuery,
                GetListOfMonumentCardsQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetListOfMonumentCardsDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetListOfMonumentCardsQuery> & {
                query: ObservableQuery<
                  GetListOfMonumentCardsQuery,
                  GetListOfMonumentCardsQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        
export const getListOfMonumentsForMap = (
            options: Omit<
              WatchQueryOptions<GetListOfMonumentsForMapQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetListOfMonumentsForMapQuery> & {
              query: ObservableQuery<
                GetListOfMonumentsForMapQuery,
                GetListOfMonumentsForMapQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetListOfMonumentsForMapDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetListOfMonumentsForMapQuery> & {
                query: ObservableQuery<
                  GetListOfMonumentsForMapQuery,
                  GetListOfMonumentsForMapQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        
export const getMonument = (
            options: Omit<
              WatchQueryOptions<GetMonumentQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetMonumentQuery> & {
              query: ObservableQuery<
                GetMonumentQuery,
                GetMonumentQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetMonumentDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetMonumentQuery> & {
                query: ObservableQuery<
                  GetMonumentQuery,
                  GetMonumentQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        
export const getMonumentCard = (
            options: Omit<
              WatchQueryOptions<GetMonumentCardQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetMonumentCardQuery> & {
              query: ObservableQuery<
                GetMonumentCardQuery,
                GetMonumentCardQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetMonumentCardDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetMonumentCardQuery> & {
                query: ObservableQuery<
                  GetMonumentCardQuery,
                  GetMonumentCardQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        
export const getMonumentCardWithConnectedExperiences = (
            options: Omit<
              WatchQueryOptions<GetMonumentCardWithConnectedExperiencesQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetMonumentCardWithConnectedExperiencesQuery> & {
              query: ObservableQuery<
                GetMonumentCardWithConnectedExperiencesQuery,
                GetMonumentCardWithConnectedExperiencesQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetMonumentCardWithConnectedExperiencesDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetMonumentCardWithConnectedExperiencesQuery> & {
                query: ObservableQuery<
                  GetMonumentCardWithConnectedExperiencesQuery,
                  GetMonumentCardWithConnectedExperiencesQueryVariables
                >;
              }
            >(
              { data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q },
              (set) => {
                q.subscribe((v: any) => {
                  set({ ...v, query: q });
                });
              }
            );
            return result;
          }
        