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
  AnswerType: { input: any; output: any; }
  ColorTheme: { input: 'dark' | 'light'; output: 'dark' | 'light'; }
  Language: { input: 'en'|'cs'; output: 'en'|'cs'; }
  Location: { input: [number, number]; output: [number, number]; }
  StringOrNumber: { input: string|number; output: string|number; }
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
  _documentId: Scalars['String']['output'];
  _permissions: Array<Scalars['String']['output']>;
  _updatedAt: Scalars['String']['output'];
  emailVerification: Scalars['Boolean']['output'];
  myId: Scalars['String']['output'];
  phoneVerification: Scalars['Boolean']['output'];
  prefs: UsersPreferences;
  /** This is URL of profile picture. Not its id. */
  profilePictureURL: Scalars['URL']['output'];
  secondsFromUserCreatedToNow: Scalars['Float']['output'];
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
  picture: Scalars['String']['input'];
  placeName: Scalars['String']['input'];
  question?: InputMaybe<QuestionInput>;
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
  connectedMonument?: Maybe<Monument>;
  connectedMonumentId: Scalars['String']['output'];
  liked?: Maybe<ExperienceLike>;
  likes: Array<ExperienceLike>;
  location: Scalars['Location']['output'];
  pictureUrl: Scalars['URL']['output'];
  user: User;
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
  user: User;
  userId: Scalars['String']['output'];
};

export type LocationInput = {
  location: Scalars['Location']['input'];
  rangeMeters?: InputMaybe<Scalars['Float']['input']>;
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
  pictureURL: Scalars['URL']['output'];
  placeDetail: PlaceDetail;
  placeDetailId: Scalars['String']['output'];
  question?: Maybe<Question>;
  questionId?: Maybe<Scalars['String']['output']>;
  topics: Array<Scalars['Topic']['output']>;
  transports: Array<Scalars['Transport']['output']>;
  user: User;
  userId: Scalars['String']['output'];
  usersAnswerToQuestion?: Maybe<UsersAnswerToQuestion>;
  usersConnectedExperiences: Array<Experience>;
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
  monument: Monument;
  monumentId: Scalars['String']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  answerQuestion: UsersAnswerToQuestion;
  createExperience: Experience;
  createMonument: Monument;
  deleteExperience: Scalars['Boolean']['output'];
  deleteMonument: Scalars['Boolean']['output'];
  likeExperience: ExperienceLike;
  likeMonument: MonumentLike;
};


export type MutationAnswerQuestionArgs = {
  answer: Scalars['StringOrNumber']['input'];
  monumentId: Scalars['String']['input'];
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
  getExperience: Experience;
  getListOfExperiences: Array<Experience>;
  getListOfMonumentLikeDocuments: Array<MonumentLike>;
  getListOfMonuments: Array<Monument>;
  getListOfUsers: Array<User>;
  getMonument: Monument;
  getUser: User;
  logInViaEmail: EmailLogin;
  logout: Scalars['Boolean']['output'];
  setSession: Scalars['Boolean']['output'];
  updateProfilePicture: Account;
};


export type QueryCreateAccountArgs = {
  language: Scalars['Language']['input'];
  myId: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type QueryGetExperienceArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetListOfExperiencesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  location?: InputMaybe<LocationInput>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetListOfMonumentLikeDocumentsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetListOfMonumentsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  location?: InputMaybe<LocationInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  topics?: InputMaybe<Array<Scalars['Topic']['input']>>;
  transports?: InputMaybe<Array<Scalars['Transport']['input']>>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetListOfUsersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  searchingText?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetMonumentArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetUserArgs = {
  myId?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryLogInViaEmailArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QuerySetSessionArgs = {
  session: Scalars['String']['input'];
};


export type QueryUpdateProfilePictureArgs = {
  picture: Scalars['String']['input'];
};

export type Question = {
  __typename?: 'Question';
  _collectionId: Scalars['String']['output'];
  _createdAt: Scalars['String']['output'];
  _databaseId: Scalars['String']['output'];
  _id: Scalars['String']['output'];
  _permissions: Array<Scalars['String']['output']>;
  _updatedAt: Scalars['String']['output'];
  correctAnswer?: Maybe<Scalars['StringOrNumber']['output']>;
  pickingAnswers?: Maybe<Array<Scalars['String']['output']>>;
  question: Scalars['String']['output'];
  type: Scalars['AnswerType']['output'];
};

export type QuestionInput = {
  correctAnswer: Scalars['StringOrNumber']['input'];
  pickingAnswers?: InputMaybe<Array<Scalars['String']['input']>>;
  question: Scalars['String']['input'];
  type: Scalars['AnswerType']['input'];
};

export type User = {
  __typename?: 'User';
  _collectionId: Scalars['String']['output'];
  _createdAt: Scalars['String']['output'];
  _databaseId: Scalars['String']['output'];
  _id: Scalars['String']['output'];
  _permissions: Array<Scalars['String']['output']>;
  _updatedAt: Scalars['String']['output'];
  experiences: Array<Experience>;
  monuments: Array<Monument>;
  myId: Scalars['String']['output'];
  /** This is URL of profile picture. Not its id. */
  profilePictureURL: Scalars['URL']['output'];
  userId: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type UsersAnswerToQuestion = {
  __typename?: 'UsersAnswerToQuestion';
  answeredCorrectly: Scalars['Boolean']['output'];
};

export type UsersPreferences = {
  __typename?: 'UsersPreferences';
  colorTheme: Scalars['ColorTheme']['output'];
  language: Scalars['Language']['output'];
  mapRange: Scalars['Int']['output'];
  termsAccepted: Scalars['Boolean']['output'];
};

export type CreateAccountQueryVariables = Exact<{
  myId: Scalars['String']['input'];
  username: Scalars['String']['input'];
  language: Scalars['Language']['input'];
}>;


export type CreateAccountQuery = { __typename?: 'Query', createAccount: { __typename?: 'Account', _updatedAt: string, _createdAt: string, userId: string, myId: string, username: string, status: boolean, emailVerification: boolean, phoneVerification: boolean, prefs: { __typename?: 'UsersPreferences', mapRange: number, termsAccepted: boolean } } };

export type GetAccountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAccountQuery = { __typename?: 'Query', getAccount: { __typename?: 'Account', _documentId: string, _createdAt: string, secondsFromUserCreatedToNow: number, userId: string, myId: string, username: string, status: boolean, emailVerification: boolean, phoneVerification: boolean, profilePictureURL: URL, prefs: { __typename?: 'UsersPreferences', mapRange: number, termsAccepted: boolean, colorTheme: 'dark' | 'light', language: 'en'|'cs' } } };

export type GetListOfUsersQueryVariables = Exact<{
  searchingText?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetListOfUsersQuery = { __typename?: 'Query', getListOfUsers: Array<{ __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: URL }> };

export type GetProfileQueryVariables = Exact<{
  myId: Scalars['String']['input'];
}>;


export type GetProfileQuery = { __typename?: 'Query', getUser: { __typename?: 'User', _permissions: Array<string>, _databaseId: string, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string, userId: string, myId: string, username: string, profilePictureURL: URL } };

export type GetUserByMyIdQueryVariables = Exact<{
  myId: Scalars['String']['input'];
}>;


export type GetUserByMyIdQuery = { __typename?: 'Query', getUser: { __typename?: 'User', _permissions: Array<string>, _databaseId: string, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string, userId: string, myId: string, username: string, profilePictureURL: URL } };

export type UpdateProfilePictureQueryVariables = Exact<{
  picture: Scalars['String']['input'];
}>;


export type UpdateProfilePictureQuery = { __typename?: 'Query', updateProfilePicture: { __typename?: 'Account', _createdAt: string, _updatedAt: string, _collectionId: string, _documentId: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, status: boolean, emailVerification: boolean, phoneVerification: boolean, profilePictureURL: URL, prefs: { __typename?: 'UsersPreferences', mapRange: number, termsAccepted: boolean } } };

export type LoginViaEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginViaEmailQuery = { __typename?: 'Query', logInViaEmail: { __typename?: 'EmailLogin', session: string } };

export type LogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutQuery = { __typename?: 'Query', logout: boolean };

export type SetSessionQueryVariables = Exact<{
  session: Scalars['String']['input'];
}>;


export type SetSessionQuery = { __typename?: 'Query', setSession: boolean };

export type CreateExperienceMutationVariables = Exact<{
  input: CreateExperienceInput;
}>;


export type CreateExperienceMutation = { __typename?: 'Mutation', createExperience: { __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, pictureUrl: URL, location: [number, number] } };

export type DeleteExperienceMutationVariables = Exact<{
  experienceId: Scalars['String']['input'];
}>;


export type DeleteExperienceMutation = { __typename?: 'Mutation', deleteExperience: boolean };

export type GetExperienceQueryVariables = Exact<{
  getExperienceId: Scalars['String']['input'];
}>;


export type GetExperienceQuery = { __typename?: 'Query', getExperience: { __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, pictureUrl: URL, location: [number, number] } };

export type GetListOfExperienceCardsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListOfExperienceCardsQuery = { __typename?: 'Query', getListOfExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, pictureUrl: URL, location: [number, number], user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, myId: string, username: string, profilePictureURL: URL, userId: string }, liked?: { __typename?: 'ExperienceLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, experienceId: string } | null, likes: Array<{ __typename?: 'ExperienceLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, experienceId: string, user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: URL } }> }> };

export type GetListOfExperiencesQueryVariables = Exact<{
  location?: InputMaybe<LocationInput>;
  userId?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetListOfExperiencesQuery = { __typename?: 'Query', getListOfExperiences: Array<{ __typename?: 'Experience', connectedMonumentId: string, location: [number, number], pictureUrl: URL, userId: string, _databaseId: string, _permissions: Array<string>, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string, liked?: { __typename?: 'ExperienceLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, experienceId: string } | null, likes: Array<{ __typename?: 'ExperienceLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, experienceId: string, user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: URL } }>, user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: URL }, connectedMonument?: { __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], userId: string, name: string, about?: string | null, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, placeDetailId: string, transports: Array<any>, pictureURL: URL, user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: URL }, placeDetail: { __typename?: 'PlaceDetail', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, name: string }, likes: Array<{ __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string, user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: URL } }>, liked?: { __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string } | null } | null }> };

export type GetListOfItemsForMapQueryVariables = Exact<{
  transports?: InputMaybe<Array<Scalars['Transport']['input']> | Scalars['Transport']['input']>;
  topics?: InputMaybe<Array<Scalars['Topic']['input']> | Scalars['Topic']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  location?: InputMaybe<LocationInput>;
}>;


export type GetListOfItemsForMapQuery = { __typename?: 'Query', getListOfExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, pictureUrl: URL, connectedMonumentId: string, location: [number, number], user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: URL } }>, getListOfMonuments: Array<{ __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], transports: Array<any>, userId: string, name: string, about?: string | null, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, placeDetailId: string, pictureURL: URL, user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: URL } }> };

export type GetListOfPlaceCardsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListOfPlaceCardsQuery = { __typename?: 'Query', getListOfMonuments: Array<{ __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, transports: Array<any>, location: [number, number], userId: string, name: string, about?: string | null, placeDetailId: string, pictureURL: URL, user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: URL }, placeDetail: { __typename?: 'PlaceDetail', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, name: string }, likes: Array<{ __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string, user: { __typename?: 'User', _id: string, userId: string, myId: string, username: string, profilePictureURL: URL } }>, liked?: { __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string } | null }>, getListOfExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, pictureUrl: URL, location: [number, number], user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, myId: string, username: string, profilePictureURL: URL, userId: string }, liked?: { __typename?: 'ExperienceLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, experienceId: string } | null, likes: Array<{ __typename?: 'ExperienceLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, experienceId: string, user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: URL } }> }> };

export type LikeExperienceMutationVariables = Exact<{
  experienceId: Scalars['String']['input'];
}>;


export type LikeExperienceMutation = { __typename?: 'Mutation', likeExperience: { __typename?: 'ExperienceLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, experienceId: string } };

export type LikeMonumentMutationVariables = Exact<{
  monumentId: Scalars['String']['input'];
}>;


export type LikeMonumentMutation = { __typename?: 'Mutation', likeMonument: { __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string } };

export type GetListOfLikedMonumentCardsQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetListOfLikedMonumentCardsQuery = { __typename?: 'Query', getListOfMonumentLikeDocuments: Array<{ __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string, monument: { __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], userId: string, name: string, about?: string | null, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, placeDetailId: string, pictureURL: URL, transports: Array<any>, questionId?: string | null, user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: URL }, placeDetail: { __typename?: 'PlaceDetail', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, name: string }, likes: Array<{ __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string, user: { __typename?: 'User', _id: string, userId: string, myId: string, username: string, profilePictureURL: URL } }>, liked?: { __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string } | null, question?: { __typename?: 'Question', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, question: string, correctAnswer?: string|number | null, pickingAnswers?: Array<string> | null, type: any } | null, usersAnswerToQuestion?: { __typename?: 'UsersAnswerToQuestion', answeredCorrectly: boolean } | null, usersConnectedExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, pictureUrl: URL, location: [number, number], connectedMonumentId: string }> } }> };

export type CreateMonumentMutationVariables = Exact<{
  input: CreateMonumentInput;
}>;


export type CreateMonumentMutation = { __typename?: 'Mutation', createMonument: { __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], userId: string, name: string, about?: string | null, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, pictureURL: URL, placeDetailId: string, transports: Array<any>, placeDetail: { __typename?: 'PlaceDetail', name: string, _databaseId: string, _permissions: Array<string>, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string }, usersConnectedExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, pictureUrl: URL, location: [number, number], connectedMonumentId: string }> } };

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
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetListOfMonumentCardsQuery = { __typename?: 'Query', getListOfMonuments: Array<{ __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], userId: string, name: string, about?: string | null, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, placeDetailId: string, pictureURL: URL, transports: Array<any>, user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: URL }, placeDetail: { __typename?: 'PlaceDetail', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, name: string }, likes: Array<{ __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string, user: { __typename?: 'User', _id: string, userId: string, myId: string, username: string, profilePictureURL: URL } }>, liked?: { __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string } | null, usersConnectedExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, pictureUrl: URL, location: [number, number], connectedMonumentId: string }> }> };

export type GetListOfMonumentsForMapQueryVariables = Exact<{
  transports?: InputMaybe<Array<Scalars['Transport']['input']> | Scalars['Transport']['input']>;
  topics?: InputMaybe<Array<Scalars['Topic']['input']> | Scalars['Topic']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  location?: InputMaybe<LocationInput>;
}>;


export type GetListOfMonumentsForMapQuery = { __typename?: 'Query', getListOfMonuments: Array<{ __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], transports: Array<any>, userId: string, name: string, about?: string | null, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, placeDetailId: string, pictureURL: URL, usersConnectedExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, pictureUrl: URL, location: [number, number], connectedMonumentId: string }> }> };

export type GetMonumentQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetMonumentQuery = { __typename?: 'Query', getMonument: { __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], userId: string, name: string, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, about?: string | null, placeDetailId: string, pictureURL: URL, transports: Array<any>, placeDetail: { __typename?: 'PlaceDetail', name: string, _databaseId: string, _permissions: Array<string>, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string } } };

export type GetMonumentCardQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetMonumentCardQuery = { __typename?: 'Query', getMonument: { __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], userId: string, name: string, about?: string | null, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, placeDetailId: string, pictureURL: URL, transports: Array<any>, questionId?: string | null, user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: URL }, placeDetail: { __typename?: 'PlaceDetail', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, name: string }, likes: Array<{ __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string, user: { __typename?: 'User', _id: string, userId: string, myId: string, username: string, profilePictureURL: URL } }>, liked?: { __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string } | null, question?: { __typename?: 'Question', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, question: string, correctAnswer?: string|number | null, pickingAnswers?: Array<string> | null, type: any } | null, usersAnswerToQuestion?: { __typename?: 'UsersAnswerToQuestion', answeredCorrectly: boolean } | null, usersConnectedExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, pictureUrl: URL, location: [number, number], connectedMonumentId: string }> } };

export type GetMonumentCardWithConnectedExperiencesQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetMonumentCardWithConnectedExperiencesQuery = { __typename?: 'Query', getMonument: { __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], userId: string, name: string, about?: string | null, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, placeDetailId: string, pictureURL: URL, transports: Array<any>, questionId?: string | null, user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: URL }, placeDetail: { __typename?: 'PlaceDetail', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, name: string }, likes: Array<{ __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string, user: { __typename?: 'User', _id: string, userId: string, myId: string, username: string, profilePictureURL: URL } }>, liked?: { __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string } | null, connectedExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, pictureUrl: URL, location: [number, number], connectedMonumentId: string, user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: URL }, likes: Array<{ __typename?: 'ExperienceLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, experienceId: string, user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: URL } }>, liked?: { __typename?: 'ExperienceLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, experienceId: string } | null }>, usersConnectedExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, pictureUrl: URL, location: [number, number], connectedMonumentId: string }>, question?: { __typename?: 'Question', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, question: string, correctAnswer?: string|number | null, pickingAnswers?: Array<string> | null, type: any } | null } };

export type AnswerQuestionMutationVariables = Exact<{
  monumentId: Scalars['String']['input'];
  answer: Scalars['StringOrNumber']['input'];
}>;


export type AnswerQuestionMutation = { __typename?: 'Mutation', answerQuestion: { __typename?: 'UsersAnswerToQuestion', answeredCorrectly: boolean } };


export const CreateAccountDoc = gql`
    query createAccount($myId: String!, $username: String!, $language: Language!) {
  createAccount(myId: $myId, username: $username, language: $language) {
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
    query getAccount {
  getAccount {
    _documentId
    _createdAt
    secondsFromUserCreatedToNow
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
      colorTheme
      language
    }
  }
}
    `;
export const GetListOfUsersDoc = gql`
    query getListOfUsers($searchingText: String, $offset: Int, $limit: Int) {
  getListOfUsers(searchingText: $searchingText, offset: $offset, limit: $limit) {
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
  getUser(myId: $myId) {
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
  }
}
    `;
export const GetUserByMyIdDoc = gql`
    query getUserByMyId($myId: String!) {
  getUser(myId: $myId) {
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
  }
}
    `;
export const UpdateProfilePictureDoc = gql`
    query updateProfilePicture($picture: String!) {
  updateProfilePicture(picture: $picture) {
    _createdAt
    _updatedAt
    _collectionId
    _documentId
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
export const LoginViaEmailDoc = gql`
    query loginViaEmail($email: String!, $password: String!) {
  logInViaEmail(email: $email, password: $password) {
    session
  }
}
    `;
export const LogoutDoc = gql`
    query logout {
  logout
}
    `;
export const SetSessionDoc = gql`
    query setSession($session: String!) {
  setSession(session: $session)
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
    pictureUrl
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
    pictureUrl
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
    pictureUrl
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
        profilePictureURL
      }
    }
  }
}
    `;
export const GetListOfExperiencesDoc = gql`
    query getListOfExperiences($location: LocationInput, $userId: String, $limit: Int, $offset: Int) {
  getListOfExperiences(
    location: $location
    userId: $userId
    limit: $limit
    offset: $offset
  ) {
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
    pictureUrl
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
    pictureUrl
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
    pictureUrl
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
export const GetListOfLikedMonumentCardsDoc = gql`
    query getListOfLikedMonumentCards($offset: Int, $limit: Int, $userId: String) {
  getListOfMonumentLikeDocuments(offset: $offset, limit: $limit, userId: $userId) {
    _createdAt
    _updatedAt
    _collectionId
    _id
    _permissions
    _databaseId
    userId
    monumentId
    monument {
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
      questionId
      question {
        _createdAt
        _updatedAt
        _collectionId
        _id
        _permissions
        _databaseId
        question
        correctAnswer
        pickingAnswers
        type
      }
      usersAnswerToQuestion {
        answeredCorrectly
      }
      usersConnectedExperiences {
        _createdAt
        _updatedAt
        _collectionId
        _id
        _permissions
        _databaseId
        userId
        pictureUrl
        location
        connectedMonumentId
      }
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
    usersConnectedExperiences {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      userId
      pictureUrl
      location
      connectedMonumentId
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
    query getListOfMonumentCards($location: LocationInput, $topics: [Topic!], $transports: [Transport!], $name: String, $limit: Int, $userId: String, $offset: Int) {
  getListOfMonuments(
    location: $location
    topics: $topics
    transports: $transports
    name: $name
    limit: $limit
    userId: $userId
    offset: $offset
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
    usersConnectedExperiences {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      userId
      pictureUrl
      location
      connectedMonumentId
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
    usersConnectedExperiences {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      userId
      pictureUrl
      location
      connectedMonumentId
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
    questionId
    question {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      question
      correctAnswer
      pickingAnswers
      type
    }
    usersAnswerToQuestion {
      answeredCorrectly
    }
    usersConnectedExperiences {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      userId
      pictureUrl
      location
      connectedMonumentId
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
      pictureUrl
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
    usersConnectedExperiences {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      userId
      pictureUrl
      location
      connectedMonumentId
    }
    questionId
    question {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      question
      correctAnswer
      pickingAnswers
      type
    }
  }
}
    `;
export const AnswerQuestionDoc = gql`
    mutation answerQuestion($monumentId: String!, $answer: StringOrNumber!) {
  answerQuestion(monumentId: $monumentId, answer: $answer) {
    answeredCorrectly
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
        
export const getListOfUsers = (
            options: Omit<
              WatchQueryOptions<GetListOfUsersQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetListOfUsersQuery> & {
              query: ObservableQuery<
                GetListOfUsersQuery,
                GetListOfUsersQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetListOfUsersDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetListOfUsersQuery> & {
                query: ObservableQuery<
                  GetListOfUsersQuery,
                  GetListOfUsersQueryVariables
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
        
export const getUserByMyId = (
            options: Omit<
              WatchQueryOptions<GetUserByMyIdQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetUserByMyIdQuery> & {
              query: ObservableQuery<
                GetUserByMyIdQuery,
                GetUserByMyIdQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetUserByMyIdDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetUserByMyIdQuery> & {
                query: ObservableQuery<
                  GetUserByMyIdQuery,
                  GetUserByMyIdQueryVariables
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
        
export const logout = (
            options: Omit<
              WatchQueryOptions<LogoutQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<LogoutQuery> & {
              query: ObservableQuery<
                LogoutQuery,
                LogoutQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: LogoutDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<LogoutQuery> & {
                query: ObservableQuery<
                  LogoutQuery,
                  LogoutQueryVariables
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
        
export const setSession = (
            options: Omit<
              WatchQueryOptions<SetSessionQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<SetSessionQuery> & {
              query: ObservableQuery<
                SetSessionQuery,
                SetSessionQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: SetSessionDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<SetSessionQuery> & {
                query: ObservableQuery<
                  SetSessionQuery,
                  SetSessionQueryVariables
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
export const getListOfLikedMonumentCards = (
            options: Omit<
              WatchQueryOptions<GetListOfLikedMonumentCardsQueryVariables>, 
              "query"
            >
          ): Readable<
            ApolloQueryResult<GetListOfLikedMonumentCardsQuery> & {
              query: ObservableQuery<
                GetListOfLikedMonumentCardsQuery,
                GetListOfLikedMonumentCardsQueryVariables
              >;
            }
          > => {
            const q = client.watchQuery({
              query: GetListOfLikedMonumentCardsDoc,
              ...options,
            });
            var result = readable<
              ApolloQueryResult<GetListOfLikedMonumentCardsQuery> & {
                query: ObservableQuery<
                  GetListOfLikedMonumentCardsQuery,
                  GetListOfLikedMonumentCardsQueryVariables
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
        
export const answerQuestion = (
            options: Omit<
              MutationOptions<any, AnswerQuestionMutationVariables>, 
              "mutation"
            >
          ) => {
            const m = client.mutate<AnswerQuestionMutation, AnswerQuestionMutationVariables>({
              mutation: AnswerQuestionDoc,
              ...options,
            });
            return m;
          }