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
  prefs?: Maybe<UsersPreferences>;
  /** This is URL of profile picture. Not its id. */
  profilePictureURL?: Maybe<Scalars['URL']['output']>;
  staus: Scalars['Boolean']['output'];
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
};

export type CreateMonumentInput = {
  about: Scalars['String']['input'];
  location: Scalars['Location']['input'];
  name: Scalars['String']['input'];
  picture?: InputMaybe<Scalars['String']['input']>;
  placeName: Scalars['String']['input'];
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
  location: Scalars['Location']['output'];
  user: Account;
  userId: Scalars['String']['output'];
};

export type ExperienceInput = {
  location: Scalars['Location']['input'];
  zoom: Scalars['Int']['input'];
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
  location: Scalars['Location']['output'];
  name: Scalars['String']['output'];
  nearExperiences: Array<Experience>;
  /** This it an URL not id of picture */
  pictureURL?: Maybe<Scalars['URL']['output']>;
  placeDetailId: Scalars['String']['output'];
  placeDetails: PlaceDetails;
};

export type MonumentInput = {
  location: Array<Scalars['Float']['input']>;
  zoom: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createExperience: Experience;
  createMonument: Monument;
};


export type MutationCreateExperienceArgs = {
  input: CreateExperienceInput;
};


export type MutationCreateMonumentArgs = {
  input: CreateMonumentInput;
};

export type PlaceDetails = {
  __typename?: 'PlaceDetails';
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
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetAccountByMyIdArgs = {
  myId: Scalars['String']['input'];
};


export type QueryGetExperienceArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetListOfExperiencesArgs = {
  input?: InputMaybe<ExperienceInput>;
};


export type QueryGetListOfMonumentsArgs = {
  input?: InputMaybe<MonumentInput>;
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


export type CreateAccountQuery = { __typename?: 'Query', createAccount: { __typename?: 'Account', _updatedAt: string, _createdAt: string, userId: string, myId: string, username: string, staus: boolean, emailVerification: boolean, phoneVerification: boolean, prefs?: { __typename?: 'UsersPreferences', location?: Array<number> | null, termsAccepted?: boolean | null } | null } };

export type LoginViaEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginViaEmailQuery = { __typename?: 'Query', logInViaEmail: { __typename?: 'EmailLogin', session: string } };

export type GetAccountQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAccountQuery = { __typename?: 'Query', getAccount: { __typename?: 'Account', _permissions: Array<string>, _databaseId: string, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string, userId: string, myId: string, username: string, staus: boolean, emailVerification: boolean, phoneVerification: boolean, profilePictureURL?: URL | null, prefs?: { __typename?: 'UsersPreferences', location?: Array<number> | null, termsAccepted?: boolean | null } | null } };

export type GetAccountByMyIdQueryVariables = Exact<{
  myId: Scalars['String']['input'];
}>;


export type GetAccountByMyIdQuery = { __typename?: 'Query', getAccountByMyId: { __typename?: 'Account', _permissions: Array<string>, _databaseId: string, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string, userId: string, myId: string, username: string, staus: boolean, emailVerification: boolean, phoneVerification: boolean, profilePictureURL?: URL | null, prefs?: { __typename?: 'UsersPreferences', location?: Array<number> | null, termsAccepted?: boolean | null } | null } };

export type GetAccountByMyIdWithExperiencesAndMonumentsQueryVariables = Exact<{
  myId: Scalars['String']['input'];
}>;


export type GetAccountByMyIdWithExperiencesAndMonumentsQuery = { __typename?: 'Query', getAccountByMyId: { __typename?: 'Account', _permissions: Array<string>, _databaseId: string, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string, userId: string, myId: string, username: string, staus: boolean, emailVerification: boolean, phoneVerification: boolean, profilePictureURL?: URL | null, prefs?: { __typename?: 'UsersPreferences', location?: Array<number> | null, termsAccepted?: boolean | null } | null, experiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, imgSrc: URL, location: [number, number] }>, monuments: Array<{ __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], creatorUserId: string, name: string, about?: string | null, pictureURL?: URL | null, placeDetailId: string, placeDetails: { __typename?: 'PlaceDetails', name: string, _databaseId: string, _permissions: Array<string>, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string } }> } };

export type GetAccountWithExperiencesQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAccountWithExperiencesQuery = { __typename?: 'Query', getAccount: { __typename?: 'Account', _permissions: Array<string>, _databaseId: string, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string, userId: string, myId: string, username: string, staus: boolean, emailVerification: boolean, phoneVerification: boolean, profilePictureURL?: URL | null, prefs?: { __typename?: 'UsersPreferences', termsAccepted?: boolean | null, location?: Array<number> | null } | null, experiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, imgSrc: URL, location: [number, number] }> } };

export type GetAccountWithExperiencesAndMonumentsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAccountWithExperiencesAndMonumentsQuery = { __typename?: 'Query', getAccount: { __typename?: 'Account', _permissions: Array<string>, _databaseId: string, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string, userId: string, myId: string, username: string, staus: boolean, emailVerification: boolean, phoneVerification: boolean, profilePictureURL?: URL | null, prefs?: { __typename?: 'UsersPreferences', location?: Array<number> | null, termsAccepted?: boolean | null } | null, experiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, imgSrc: URL, location: [number, number] }>, monuments: Array<{ __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], creatorUserId: string, name: string, about?: string | null, pictureURL?: URL | null }> } };

export type GetAccountWithMonumentsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAccountWithMonumentsQuery = { __typename?: 'Query', getAccount: { __typename?: 'Account', _permissions: Array<string>, _databaseId: string, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string, userId: string, myId: string, username: string, staus: boolean, emailVerification: boolean, phoneVerification: boolean, profilePictureURL?: URL | null, prefs?: { __typename?: 'UsersPreferences', location?: Array<number> | null, termsAccepted?: boolean | null } | null, monuments: Array<{ __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], creatorUserId: string, name: string, about?: string | null, pictureURL?: URL | null }> } };

export type UpdateProfilePictureQueryVariables = Exact<{
  picture: Scalars['String']['input'];
}>;


export type UpdateProfilePictureQuery = { __typename?: 'Query', updateProfilePicture: { __typename?: 'Account', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, staus: boolean, emailVerification: boolean, phoneVerification: boolean, profilePictureURL?: URL | null, prefs?: { __typename?: 'UsersPreferences', location?: Array<number> | null, termsAccepted?: boolean | null } | null } };

export type CreateExperienceMutationVariables = Exact<{
  input: CreateExperienceInput;
}>;


export type CreateExperienceMutation = { __typename?: 'Mutation', createExperience: { __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, imgSrc: URL, location: [number, number] } };

export type GetExperienceQueryVariables = Exact<{
  getExperienceId: Scalars['String']['input'];
}>;


export type GetExperienceQuery = { __typename?: 'Query', getExperience: { __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, imgSrc: URL, location: [number, number] } };

export type GetListOfExperiencesQueryVariables = Exact<{
  input?: InputMaybe<ExperienceInput>;
}>;


export type GetListOfExperiencesQuery = { __typename?: 'Query', getListOfExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, imgSrc: URL, location: [number, number] }> };

export type GetListOfExperiencesWithCreatorAndListOfMonumentsWithCreatorAndHisOtherMonumentsQueryVariables = Exact<{
  input?: InputMaybe<MonumentInput>;
  getListOfExperienceInput2?: InputMaybe<ExperienceInput>;
}>;


export type GetListOfExperiencesWithCreatorAndListOfMonumentsWithCreatorAndHisOtherMonumentsQuery = { __typename?: 'Query', getListOfExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, imgSrc: URL, location: [number, number], user: { __typename?: 'Account', _createdAt: string, _updatedAt: string, userId: string, myId: string, username: string, staus: boolean, emailVerification: boolean, phoneVerification: boolean, profilePictureURL?: URL | null, prefs?: { __typename?: 'UsersPreferences', location?: Array<number> | null, termsAccepted?: boolean | null } | null } }>, getListOfMonuments: Array<{ __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], creatorUserId: string, name: string, about?: string | null, placeDetailId: string, pictureURL?: URL | null, creator: { __typename?: 'Account', _permissions: Array<string>, _databaseId: string, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string, userId: string, myId: string, username: string, staus: boolean, emailVerification: boolean, phoneVerification: boolean, profilePictureURL?: URL | null, monuments: Array<{ __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], creatorUserId: string, name: string, about?: string | null, placeDetailId: string, pictureURL?: URL | null, placeDetails: { __typename?: 'PlaceDetails', name: string, _databaseId: string, _permissions: Array<string>, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string } }>, prefs?: { __typename?: 'UsersPreferences', location?: Array<number> | null, termsAccepted?: boolean | null } | null }, placeDetails: { __typename?: 'PlaceDetails', name: string, _databaseId: string, _permissions: Array<string>, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string } }> };

export type CreateMonumentMutationVariables = Exact<{
  input: CreateMonumentInput;
}>;


export type CreateMonumentMutation = { __typename?: 'Mutation', createMonument: { __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], creatorUserId: string, name: string, about?: string | null, pictureURL?: URL | null, placeDetailId: string, placeDetails: { __typename?: 'PlaceDetails', name: string, _databaseId: string, _permissions: Array<string>, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string } } };

export type GetListOfMonumentsWithCreatorQueryVariables = Exact<{
  input?: InputMaybe<MonumentInput>;
}>;


export type GetListOfMonumentsWithCreatorQuery = { __typename?: 'Query', getListOfMonuments: Array<{ __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], creatorUserId: string, name: string, about?: string | null, placeDetailId: string, pictureURL?: URL | null, creator: { __typename?: 'Account', _permissions: Array<string>, _databaseId: string, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string, userId: string, myId: string, username: string, staus: boolean, emailVerification: boolean, phoneVerification: boolean, profilePictureURL?: URL | null }, placeDetails: { __typename?: 'PlaceDetails', name: string, _databaseId: string, _permissions: Array<string>, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string } }> };

export type GetListOfMonumentsWithCreatorAndNearestExperiencesQueryVariables = Exact<{
  input?: InputMaybe<MonumentInput>;
}>;


export type GetListOfMonumentsWithCreatorAndNearestExperiencesQuery = { __typename?: 'Query', getListOfMonuments: Array<{ __typename?: 'Monument', pictureURL?: URL | null, placeDetailId: string, about?: string | null, name: string, location: [number, number], creatorUserId: string, _databaseId: string, _permissions: Array<string>, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string, creator: { __typename?: 'Account', _permissions: Array<string>, _databaseId: string, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string, userId: string, myId: string, username: string, staus: boolean, emailVerification: boolean, phoneVerification: boolean, profilePictureURL?: URL | null, prefs?: { __typename?: 'UsersPreferences', location?: Array<number> | null, termsAccepted?: boolean | null } | null }, placeDetails: { __typename?: 'PlaceDetails', name: string, _databaseId: string, _permissions: Array<string>, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string }, nearExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, imgSrc: URL, location: [number, number] }> }> };

export type GetMonumentQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetMonumentQuery = { __typename?: 'Query', getMonument: { __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], creatorUserId: string, name: string, about?: string | null, placeDetailId: string, pictureURL?: URL | null, placeDetails: { __typename?: 'PlaceDetails', name: string, _databaseId: string, _permissions: Array<string>, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string } } };

export type GetMonumentWithCreatorAndNearestListOfExperienceQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetMonumentWithCreatorAndNearestListOfExperienceQuery = { __typename?: 'Query', getMonument: { __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], creatorUserId: string, name: string, about?: string | null, placeDetailId: string, pictureURL?: URL | null, creator: { __typename?: 'Account', _permissions: Array<string>, _databaseId: string, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string, userId: string, myId: string, username: string, staus: boolean, emailVerification: boolean, phoneVerification: boolean, profilePictureURL?: URL | null }, nearExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, imgSrc: URL, location: [number, number] }>, placeDetails: { __typename?: 'PlaceDetails', name: string, _databaseId: string, _permissions: Array<string>, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string } } };


export const CreateAccountDoc = gql`
    query createAccount($myId: String!, $username: String!) {
  createAccount(myId: $myId, username: $username) {
    _updatedAt
    _createdAt
    userId
    myId
    username
    staus
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
    staus
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
    staus
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
export const GetAccountByMyIdWithExperiencesAndMonumentsDoc = gql`
    query getAccountByMyIdWithExperiencesAndMonuments($myId: String!) {
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
    staus
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
      placeDetails {
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
    staus
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
    staus
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
    staus
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
    staus
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
  }
}
    `;
export const GetListOfExperiencesWithCreatorAndListOfMonumentsWithCreatorAndHisOtherMonumentsDoc = gql`
    query getListOfExperiencesWithCreatorAndListOfMonumentsWithCreatorAndHisOtherMonuments($input: MonumentInput, $getListOfExperienceInput2: ExperienceInput) {
  getListOfExperiences(input: $getListOfExperienceInput2) {
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
      userId
      myId
      username
      staus
      emailVerification
      phoneVerification
      profilePictureURL
      prefs {
        location
        termsAccepted
      }
    }
  }
  getListOfMonuments(input: $input) {
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
      _permissions
      _databaseId
      _id
      _collectionId
      _updatedAt
      _createdAt
      userId
      myId
      username
      staus
      emailVerification
      phoneVerification
      profilePictureURL
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
        placeDetailId
        pictureURL
        placeDetails {
          name
          _databaseId
          _permissions
          _id
          _collectionId
          _updatedAt
          _createdAt
        }
      }
      prefs {
        location
        termsAccepted
      }
    }
    placeDetails {
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
    pictureURL
    placeDetailId
    placeDetails {
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
export const GetListOfMonumentsWithCreatorDoc = gql`
    query getListOfMonumentsWithCreator($input: MonumentInput) {
  getListOfMonuments(input: $input) {
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
      _permissions
      _databaseId
      _id
      _collectionId
      _updatedAt
      _createdAt
      userId
      myId
      username
      staus
      emailVerification
      phoneVerification
      profilePictureURL
    }
    placeDetails {
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
export const GetListOfMonumentsWithCreatorAndNearestExperiencesDoc = gql`
    query getListOfMonumentsWithCreatorAndNearestExperiences($input: MonumentInput) {
  getListOfMonuments(input: $input) {
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
      staus
      emailVerification
      phoneVerification
      profilePictureURL
      prefs {
        location
        termsAccepted
      }
    }
    placeDetails {
      name
      _databaseId
      _permissions
      _id
      _collectionId
      _updatedAt
      _createdAt
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
    }
    pictureURL
    placeDetailId
    about
    name
    location
    creatorUserId
    _databaseId
    _permissions
    _id
    _collectionId
    _updatedAt
    _createdAt
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
    about
    placeDetailId
    pictureURL
    placeDetails {
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
      staus
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
    }
    placeDetails {
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
        
export const getAccountByMyIdWithExperiencesAndMonuments = (
            options: Omit<
              WatchQueryOptions<GetAccountByMyIdWithExperiencesAndMonumentsQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetAccountByMyIdWithExperiencesAndMonumentsQuery> & {
              query: ObservableQuery<
                GetAccountByMyIdWithExperiencesAndMonumentsQuery,
                GetAccountByMyIdWithExperiencesAndMonumentsQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetAccountByMyIdWithExperiencesAndMonumentsDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetAccountByMyIdWithExperiencesAndMonumentsQuery> & {
                query: ObservableQuery<
                  GetAccountByMyIdWithExperiencesAndMonumentsQuery,
                  GetAccountByMyIdWithExperiencesAndMonumentsQueryVariables
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
        
export const getListOfExperiencesWithCreatorAndListOfMonumentsWithCreatorAndHisOtherMonuments = (
            options: Omit<
              WatchQueryOptions<GetListOfExperiencesWithCreatorAndListOfMonumentsWithCreatorAndHisOtherMonumentsQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetListOfExperiencesWithCreatorAndListOfMonumentsWithCreatorAndHisOtherMonumentsQuery> & {
              query: ObservableQuery<
                GetListOfExperiencesWithCreatorAndListOfMonumentsWithCreatorAndHisOtherMonumentsQuery,
                GetListOfExperiencesWithCreatorAndListOfMonumentsWithCreatorAndHisOtherMonumentsQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetListOfExperiencesWithCreatorAndListOfMonumentsWithCreatorAndHisOtherMonumentsDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetListOfExperiencesWithCreatorAndListOfMonumentsWithCreatorAndHisOtherMonumentsQuery> & {
                query: ObservableQuery<
                  GetListOfExperiencesWithCreatorAndListOfMonumentsWithCreatorAndHisOtherMonumentsQuery,
                  GetListOfExperiencesWithCreatorAndListOfMonumentsWithCreatorAndHisOtherMonumentsQueryVariables
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
export const getListOfMonumentsWithCreator = (
            options: Omit<
              WatchQueryOptions<GetListOfMonumentsWithCreatorQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetListOfMonumentsWithCreatorQuery> & {
              query: ObservableQuery<
                GetListOfMonumentsWithCreatorQuery,
                GetListOfMonumentsWithCreatorQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetListOfMonumentsWithCreatorDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetListOfMonumentsWithCreatorQuery> & {
                query: ObservableQuery<
                  GetListOfMonumentsWithCreatorQuery,
                  GetListOfMonumentsWithCreatorQueryVariables
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
        
export const getListOfMonumentsWithCreatorAndNearestExperiences = (
            options: Omit<
              WatchQueryOptions<GetListOfMonumentsWithCreatorAndNearestExperiencesQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetListOfMonumentsWithCreatorAndNearestExperiencesQuery> & {
              query: ObservableQuery<
                GetListOfMonumentsWithCreatorAndNearestExperiencesQuery,
                GetListOfMonumentsWithCreatorAndNearestExperiencesQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetListOfMonumentsWithCreatorAndNearestExperiencesDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetListOfMonumentsWithCreatorAndNearestExperiencesQuery> & {
                query: ObservableQuery<
                  GetListOfMonumentsWithCreatorAndNearestExperiencesQuery,
                  GetListOfMonumentsWithCreatorAndNearestExperiencesQueryVariables
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
        