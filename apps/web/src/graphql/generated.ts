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
  getListOfExperience: Array<Experience>;
  getListOfMonuments: Array<Monument>;
  getMonument: Monument;
  logInViaEmail: EmailLogin;
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


export type QueryGetListOfExperienceArgs = {
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

export type CreateExperienceMutationVariables = Exact<{
  input: CreateExperienceInput;
}>;


export type CreateExperienceMutation = { __typename?: 'Mutation', createExperience: { __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, imgSrc: URL, location: [number, number] } };

export type GetExperienceQueryVariables = Exact<{
  getExperienceId: Scalars['String']['input'];
}>;


export type GetExperienceQuery = { __typename?: 'Query', getExperience: { __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, imgSrc: URL, location: [number, number] } };

export type GetListOfExperienceQueryVariables = Exact<{
  input?: InputMaybe<ExperienceInput>;
}>;


export type GetListOfExperienceQuery = { __typename?: 'Query', getListOfExperience: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, imgSrc: URL, location: [number, number] }> };

export type GetListOfExperienceWithCreatorAndListOfMonumentsWithCreatorAndHisOtherMonumentsQueryVariables = Exact<{
  input?: InputMaybe<MonumentInput>;
  getListOfExperienceInput2?: InputMaybe<ExperienceInput>;
}>;


export type GetListOfExperienceWithCreatorAndListOfMonumentsWithCreatorAndHisOtherMonumentsQuery = { __typename?: 'Query', getListOfExperience: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, imgSrc: URL, location: [number, number], user: { __typename?: 'Account', _createdAt: string, _updatedAt: string, userId: string, myId: string, username: string, staus: boolean, emailVerification: boolean, phoneVerification: boolean, profilePictureURL?: URL | null, prefs?: { __typename?: 'UsersPreferences', location?: Array<number> | null, termsAccepted?: boolean | null } | null } }>, getListOfMonuments: Array<{ __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], creatorUserId: string, name: string, about?: string | null, placeDetailId: string, pictureURL?: URL | null, creator: { __typename?: 'Account', _permissions: Array<string>, _databaseId: string, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string, userId: string, myId: string, username: string, staus: boolean, emailVerification: boolean, phoneVerification: boolean, profilePictureURL?: URL | null, monuments: Array<{ __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], creatorUserId: string, name: string, about?: string | null, placeDetailId: string, pictureURL?: URL | null, placeDetails: { __typename?: 'PlaceDetails', name: string, _databaseId: string, _permissions: Array<string>, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string } }>, prefs?: { __typename?: 'UsersPreferences', location?: Array<number> | null, termsAccepted?: boolean | null } | null }, placeDetails: { __typename?: 'PlaceDetails', name: string, _databaseId: string, _permissions: Array<string>, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string } }> };

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


export const CreateAccountDocument = gql`
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
export const GetAccountByMyIdWithExperiencesAndMonumentsDocument = gql`
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
  }
}
    `;
export const GetListOfExperienceDocument = gql`
    query getListOfExperience($input: ExperienceInput) {
  getListOfExperience(input: $input) {
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
export const GetListOfExperienceWithCreatorAndListOfMonumentsWithCreatorAndHisOtherMonumentsDocument = gql`
    query getListOfExperienceWithCreatorAndListOfMonumentsWithCreatorAndHisOtherMonuments($input: MonumentInput, $getListOfExperienceInput2: ExperienceInput) {
  getListOfExperience(input: $getListOfExperienceInput2) {
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
export const GetListOfMonumentsWithCreatorDocument = gql`
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
export const GetListOfMonumentsWithCreatorAndNearestExperiencesDocument = gql`
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
    getAccountByMyIdWithExperiencesAndMonuments(variables: GetAccountByMyIdWithExperiencesAndMonumentsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAccountByMyIdWithExperiencesAndMonumentsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAccountByMyIdWithExperiencesAndMonumentsQuery>(GetAccountByMyIdWithExperiencesAndMonumentsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAccountByMyIdWithExperiencesAndMonuments', 'query');
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
    createExperience(variables: CreateExperienceMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateExperienceMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateExperienceMutation>(CreateExperienceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createExperience', 'mutation');
    },
    getExperience(variables: GetExperienceQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetExperienceQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetExperienceQuery>(GetExperienceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getExperience', 'query');
    },
    getListOfExperience(variables?: GetListOfExperienceQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetListOfExperienceQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetListOfExperienceQuery>(GetListOfExperienceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getListOfExperience', 'query');
    },
    getListOfExperienceWithCreatorAndListOfMonumentsWithCreatorAndHisOtherMonuments(variables?: GetListOfExperienceWithCreatorAndListOfMonumentsWithCreatorAndHisOtherMonumentsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetListOfExperienceWithCreatorAndListOfMonumentsWithCreatorAndHisOtherMonumentsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetListOfExperienceWithCreatorAndListOfMonumentsWithCreatorAndHisOtherMonumentsQuery>(GetListOfExperienceWithCreatorAndListOfMonumentsWithCreatorAndHisOtherMonumentsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getListOfExperienceWithCreatorAndListOfMonumentsWithCreatorAndHisOtherMonuments', 'query');
    },
    createMonument(variables: CreateMonumentMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateMonumentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateMonumentMutation>(CreateMonumentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createMonument', 'mutation');
    },
    getListOfMonumentsWithCreator(variables?: GetListOfMonumentsWithCreatorQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetListOfMonumentsWithCreatorQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetListOfMonumentsWithCreatorQuery>(GetListOfMonumentsWithCreatorDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getListOfMonumentsWithCreator', 'query');
    },
    getListOfMonumentsWithCreatorAndNearestExperiences(variables?: GetListOfMonumentsWithCreatorAndNearestExperiencesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetListOfMonumentsWithCreatorAndNearestExperiencesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetListOfMonumentsWithCreatorAndNearestExperiencesQuery>(GetListOfMonumentsWithCreatorAndNearestExperiencesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getListOfMonumentsWithCreatorAndNearestExperiences', 'query');
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