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
      location
      termsAccepted
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
      location
      termsAccepted
    }
  }
}
    `;
export const GetAccountByMyIdDoc = gql`
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
export const GetAccountWithExperiencesDoc = gql`
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
export const GetAccountWithExperiencesAndMonumentsDoc = gql`
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
export const GetAccountWithMonumentsDoc = gql`
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
      location
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
    placeDetailId
  }
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
    placeDetailId
  }
}
    `;
export const GetExperienceWithCreatorAndHisOtherExperiencesDoc = gql`
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
export const GetListOfExperiencesDoc = gql`
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
export const GetListOfExperiencesWithCreatorDoc = gql`
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
export const GetListOfItemsForMapDoc = gql`
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
export const GetListOfPlaceCardsDoc = gql`
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
export const DeleteMonumentDoc = gql`
    mutation deleteMonument($monumentId: String!) {
  deleteMonument(monumentId: $monumentId)
}
    `;
export const GetListOfMonumentCardsDoc = gql`
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
export const GetListOfMonumentCardsByLocationDoc = gql`
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
export const GetListOfMonumentCardsByLocationAndTopicsDoc = gql`
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
export const GetListOfMonumentCardsBySearchingNameDoc = gql`
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
export const GetMonumentWithCreatorAndNearestListOfExperienceDoc = gql`
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
        
export const getAccountWithExperiences = (
            options: Omit<
              WatchQueryOptions<GetAccountWithExperiencesQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetAccountWithExperiencesQuery> & {
              query: ObservableQuery<
                GetAccountWithExperiencesQuery,
                GetAccountWithExperiencesQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetAccountWithExperiencesDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetAccountWithExperiencesQuery> & {
                query: ObservableQuery<
                  GetAccountWithExperiencesQuery,
                  GetAccountWithExperiencesQueryVariables
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
        
export const getAccountWithExperiencesAndMonuments = (
            options: Omit<
              WatchQueryOptions<GetAccountWithExperiencesAndMonumentsQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetAccountWithExperiencesAndMonumentsQuery> & {
              query: ObservableQuery<
                GetAccountWithExperiencesAndMonumentsQuery,
                GetAccountWithExperiencesAndMonumentsQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetAccountWithExperiencesAndMonumentsDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetAccountWithExperiencesAndMonumentsQuery> & {
                query: ObservableQuery<
                  GetAccountWithExperiencesAndMonumentsQuery,
                  GetAccountWithExperiencesAndMonumentsQueryVariables
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
        
export const getAccountWithMonuments = (
            options: Omit<
              WatchQueryOptions<GetAccountWithMonumentsQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetAccountWithMonumentsQuery> & {
              query: ObservableQuery<
                GetAccountWithMonumentsQuery,
                GetAccountWithMonumentsQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetAccountWithMonumentsDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetAccountWithMonumentsQuery> & {
                query: ObservableQuery<
                  GetAccountWithMonumentsQuery,
                  GetAccountWithMonumentsQueryVariables
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
        
export const getExperienceWithCreatorAndHisOtherExperiences = (
            options: Omit<
              WatchQueryOptions<GetExperienceWithCreatorAndHisOtherExperiencesQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetExperienceWithCreatorAndHisOtherExperiencesQuery> & {
              query: ObservableQuery<
                GetExperienceWithCreatorAndHisOtherExperiencesQuery,
                GetExperienceWithCreatorAndHisOtherExperiencesQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetExperienceWithCreatorAndHisOtherExperiencesDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetExperienceWithCreatorAndHisOtherExperiencesQuery> & {
                query: ObservableQuery<
                  GetExperienceWithCreatorAndHisOtherExperiencesQuery,
                  GetExperienceWithCreatorAndHisOtherExperiencesQueryVariables
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
        
export const getListOfExperiencesWithCreator = (
            options: Omit<
              WatchQueryOptions<GetListOfExperiencesWithCreatorQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetListOfExperiencesWithCreatorQuery> & {
              query: ObservableQuery<
                GetListOfExperiencesWithCreatorQuery,
                GetListOfExperiencesWithCreatorQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetListOfExperiencesWithCreatorDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetListOfExperiencesWithCreatorQuery> & {
                query: ObservableQuery<
                  GetListOfExperiencesWithCreatorQuery,
                  GetListOfExperiencesWithCreatorQueryVariables
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
        
export const getListOfMonumentCardsByLocation = (
            options: Omit<
              WatchQueryOptions<GetListOfMonumentCardsByLocationQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetListOfMonumentCardsByLocationQuery> & {
              query: ObservableQuery<
                GetListOfMonumentCardsByLocationQuery,
                GetListOfMonumentCardsByLocationQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetListOfMonumentCardsByLocationDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetListOfMonumentCardsByLocationQuery> & {
                query: ObservableQuery<
                  GetListOfMonumentCardsByLocationQuery,
                  GetListOfMonumentCardsByLocationQueryVariables
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
        
export const getListOfMonumentCardsByLocationAndTopics = (
            options: Omit<
              WatchQueryOptions<GetListOfMonumentCardsByLocationAndTopicsQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetListOfMonumentCardsByLocationAndTopicsQuery> & {
              query: ObservableQuery<
                GetListOfMonumentCardsByLocationAndTopicsQuery,
                GetListOfMonumentCardsByLocationAndTopicsQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetListOfMonumentCardsByLocationAndTopicsDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetListOfMonumentCardsByLocationAndTopicsQuery> & {
                query: ObservableQuery<
                  GetListOfMonumentCardsByLocationAndTopicsQuery,
                  GetListOfMonumentCardsByLocationAndTopicsQueryVariables
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
        
export const getListOfMonumentCardsBySearchingName = (
            options: Omit<
              WatchQueryOptions<GetListOfMonumentCardsBySearchingNameQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetListOfMonumentCardsBySearchingNameQuery> & {
              query: ObservableQuery<
                GetListOfMonumentCardsBySearchingNameQuery,
                GetListOfMonumentCardsBySearchingNameQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetListOfMonumentCardsBySearchingNameDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetListOfMonumentCardsBySearchingNameQuery> & {
                query: ObservableQuery<
                  GetListOfMonumentCardsBySearchingNameQuery,
                  GetListOfMonumentCardsBySearchingNameQueryVariables
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
        
export const getMonumentWithCreatorAndNearestListOfExperience = (
            options: Omit<
              WatchQueryOptions<GetMonumentWithCreatorAndNearestListOfExperienceQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetMonumentWithCreatorAndNearestListOfExperienceQuery> & {
              query: ObservableQuery<
                GetMonumentWithCreatorAndNearestListOfExperienceQuery,
                GetMonumentWithCreatorAndNearestListOfExperienceQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetMonumentWithCreatorAndNearestListOfExperienceDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetMonumentWithCreatorAndNearestListOfExperienceQuery> & {
                query: ObservableQuery<
                  GetMonumentWithCreatorAndNearestListOfExperienceQuery,
                  GetMonumentWithCreatorAndNearestListOfExperienceQueryVariables
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
        