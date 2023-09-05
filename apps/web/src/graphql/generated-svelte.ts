import client from "./client";
import type {
        ApolloQueryResult, ObservableQuery, WatchQueryOptions
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
};

export type Account = {
  __typename?: 'Account';
  createdAt: Scalars['String']['output'];
  emailVerification: Scalars['Boolean']['output'];
  experiences: Array<Experience>;
  monuments: Array<Monument>;
  myId: Scalars['String']['output'];
  phoneVerification: Scalars['Boolean']['output'];
  prefs?: Maybe<UsersPreferences>;
  /** This is URL of profile picture. Not its id. */
  profilePictureURL?: Maybe<Scalars['String']['output']>;
  staus: Scalars['Boolean']['output'];
  updatedAt: Scalars['String']['output'];
  userId: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type CreateAccountInput = {
  myId: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type EmailLogin = {
  __typename?: 'EmailLogin';
  session: Scalars['String']['output'];
};

export type Experience = {
  __typename?: 'Experience';
  collectionId: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  databaseId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  imgSrc: Scalars['String']['output'];
  location: Array<Scalars['Float']['output']>;
  permissions: Array<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
  user: Account;
  userId: Scalars['String']['output'];
};

export type ExperienceInput = {
  location: Array<Scalars['Float']['input']>;
  zoom: Scalars['Int']['input'];
};

export type Monument = {
  __typename?: 'Monument';
  about?: Maybe<Scalars['String']['output']>;
  collectionId: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  creatorUserId: Scalars['String']['output'];
  databaseId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  location: Array<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  nearExperiences: Array<Experience>;
  permissions: Array<Scalars['String']['output']>;
  /** This it an URL not id of picture */
  pictureURL?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
  user: Account;
};

export type MonumentInput = {
  location: Array<Scalars['Float']['input']>;
  zoom: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  createAccount: Account;
  getAccount: Account;
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

export type LoginViaEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginViaEmailQuery = { __typename?: 'Query', logInViaEmail: { __typename?: 'EmailLogin', session: string } };

export type CreateAccountQueryVariables = Exact<{
  myId: Scalars['String']['input'];
  username: Scalars['String']['input'];
}>;


export type CreateAccountQuery = { __typename?: 'Query', createAccount: { __typename?: 'Account', updatedAt: string, createdAt: string, userId: string, myId: string, username: string, staus: boolean, emailVerification: boolean, phoneVerification: boolean, prefs?: { __typename?: 'UsersPreferences', location?: Array<number> | null, termsAccepted?: boolean | null } | null } };

export type GetAccountQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAccountQuery = { __typename?: 'Query', getAccount: { __typename?: 'Account', updatedAt: string, createdAt: string, userId: string, myId: string, username: string, staus: boolean, emailVerification: boolean, phoneVerification: boolean, profilePictureURL?: string | null, prefs?: { __typename?: 'UsersPreferences', location?: Array<number> | null, termsAccepted?: boolean | null } | null } };

export type GetAccountWithExperiencesQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAccountWithExperiencesQuery = { __typename?: 'Query', getAccount: { __typename?: 'Account', updatedAt: string, createdAt: string, userId: string, myId: string, username: string, staus: boolean, emailVerification: boolean, phoneVerification: boolean, profilePictureURL?: string | null, prefs?: { __typename?: 'UsersPreferences', location?: Array<number> | null, termsAccepted?: boolean | null } | null, experiences: Array<{ __typename?: 'Experience', userId: string, imgSrc: string, location: Array<number>, createdAt: string, updatedAt: string, collectionId: string, id: string, permissions: Array<string>, databaseId: string }> } };

export type GetAccountWithMonumentsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAccountWithMonumentsQuery = { __typename?: 'Query', getAccount: { __typename?: 'Account', updatedAt: string, createdAt: string, userId: string, myId: string, username: string, staus: boolean, emailVerification: boolean, phoneVerification: boolean, profilePictureURL?: string | null, prefs?: { __typename?: 'UsersPreferences', location?: Array<number> | null, termsAccepted?: boolean | null } | null, monuments: Array<{ __typename?: 'Monument', location: Array<number>, creatorUserId: string, name: string, about?: string | null, pictureURL?: string | null, createdAt: string, updatedAt: string, collectionId: string, id: string, permissions: Array<string>, databaseId: string }> } };

export type GetAccountWithExperiencesAndMonumentsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAccountWithExperiencesAndMonumentsQuery = { __typename?: 'Query', getAccount: { __typename?: 'Account', updatedAt: string, createdAt: string, userId: string, myId: string, username: string, staus: boolean, emailVerification: boolean, phoneVerification: boolean, profilePictureURL?: string | null, prefs?: { __typename?: 'UsersPreferences', location?: Array<number> | null, termsAccepted?: boolean | null } | null, monuments: Array<{ __typename?: 'Monument', location: Array<number>, creatorUserId: string, name: string, about?: string | null, pictureURL?: string | null, createdAt: string, updatedAt: string, collectionId: string, id: string, permissions: Array<string>, databaseId: string }>, experiences: Array<{ __typename?: 'Experience', userId: string, imgSrc: string, location: Array<number>, createdAt: string, updatedAt: string, collectionId: string, id: string, permissions: Array<string>, databaseId: string }> } };


export const LoginViaEmailDoc = gql`
    query loginViaEmail($email: String!, $password: String!) {
  logInViaEmail(email: $email, password: $password) {
    session
  }
}
    `;
export const CreateAccountDoc = gql`
    query createAccount($myId: String!, $username: String!) {
  createAccount(myId: $myId, username: $username) {
    updatedAt
    createdAt
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
export const GetAccountDoc = gql`
    query getAccount($userId: String) {
  getAccount(userId: $userId) {
    updatedAt
    createdAt
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
export const GetAccountWithExperiencesDoc = gql`
    query getAccountWithExperiences($userId: String) {
  getAccount(userId: $userId) {
    updatedAt
    createdAt
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
      userId
      imgSrc
      location
      createdAt
      updatedAt
      collectionId
      id
      permissions
      databaseId
    }
  }
}
    `;
export const GetAccountWithMonumentsDoc = gql`
    query getAccountWithMonuments($userId: String) {
  getAccount(userId: $userId) {
    updatedAt
    createdAt
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
      location
      creatorUserId
      name
      about
      pictureURL
      createdAt
      updatedAt
      collectionId
      id
      permissions
      databaseId
    }
  }
}
    `;
export const GetAccountWithExperiencesAndMonumentsDoc = gql`
    query getAccountWithExperiencesAndMonuments($userId: String) {
  getAccount(userId: $userId) {
    updatedAt
    createdAt
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
      location
      creatorUserId
      name
      about
      pictureURL
      createdAt
      updatedAt
      collectionId
      id
      permissions
      databaseId
    }
    experiences {
      userId
      imgSrc
      location
      createdAt
      updatedAt
      collectionId
      id
      permissions
      databaseId
    }
  }
}
    `;
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
        