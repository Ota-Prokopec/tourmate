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
  profilePictureURL: Scalars['String']['output'];
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

export type CreateTourInput = {
  monumentIds: Array<Scalars['String']['input']>;
  tourName: Scalars['String']['input'];
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
  pictureUrl: Scalars['String']['output'];
  totalLikesCount: Scalars['Int']['output'];
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
  pictureURL: Scalars['String']['output'];
  placeDetail: PlaceDetail;
  placeDetailId: Scalars['String']['output'];
  question?: Maybe<Question>;
  questionId?: Maybe<Scalars['String']['output']>;
  topics: Array<Scalars['Topic']['output']>;
  totalLikesCount: Scalars['Int']['output'];
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
  createTour: Tour;
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


export type MutationCreateTourArgs = {
  input: CreateTourInput;
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
  getListOfTours: Array<Tour>;
  getListOfUsers: Array<User>;
  getMonument: Monument;
  getTour: Tour;
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


export type QueryGetListOfToursArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
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


export type QueryGetTourArgs = {
  tourId: Scalars['String']['input'];
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

export type Tour = {
  __typename?: 'Tour';
  _collectionId: Scalars['String']['output'];
  _createdAt: Scalars['String']['output'];
  _databaseId: Scalars['String']['output'];
  _id: Scalars['String']['output'];
  _permissions: Array<Scalars['String']['output']>;
  _updatedAt: Scalars['String']['output'];
  creator: User;
  monumentIds: Array<Scalars['String']['output']>;
  monuments: Array<Monument>;
  tourName: Scalars['String']['output'];
  userId: Scalars['String']['output'];
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
  profilePictureURL: Scalars['String']['output'];
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


export type GetAccountQuery = { __typename?: 'Query', getAccount: { __typename?: 'Account', _documentId: string, _createdAt: string, secondsFromUserCreatedToNow: number, userId: string, myId: string, username: string, status: boolean, emailVerification: boolean, phoneVerification: boolean, profilePictureURL: string, prefs: { __typename?: 'UsersPreferences', mapRange: number, termsAccepted: boolean, colorTheme: 'dark' | 'light', language: 'en'|'cs' } } };

export type GetListOfUsersQueryVariables = Exact<{
  searchingText?: InputMaybe<Scalars['String']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetListOfUsersQuery = { __typename?: 'Query', getListOfUsers: Array<{ __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: string }> };

export type GetProfileQueryVariables = Exact<{
  myId: Scalars['String']['input'];
}>;


export type GetProfileQuery = { __typename?: 'Query', getUser: { __typename?: 'User', _permissions: Array<string>, _databaseId: string, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string, userId: string, myId: string, username: string, profilePictureURL: string } };

export type GetUserByMyIdQueryVariables = Exact<{
  myId: Scalars['String']['input'];
}>;


export type GetUserByMyIdQuery = { __typename?: 'Query', getUser: { __typename?: 'User', _permissions: Array<string>, _databaseId: string, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string, userId: string, myId: string, username: string, profilePictureURL: string } };

export type UpdateProfilePictureQueryVariables = Exact<{
  picture: Scalars['String']['input'];
}>;


export type UpdateProfilePictureQuery = { __typename?: 'Query', updateProfilePicture: { __typename?: 'Account', _createdAt: string, _updatedAt: string, _collectionId: string, _documentId: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, status: boolean, emailVerification: boolean, phoneVerification: boolean, profilePictureURL: string, prefs: { __typename?: 'UsersPreferences', mapRange: number, termsAccepted: boolean } } };

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


export type CreateExperienceMutation = { __typename?: 'Mutation', createExperience: { __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, pictureUrl: string, location: [number, number] } };

export type DeleteExperienceMutationVariables = Exact<{
  experienceId: Scalars['String']['input'];
}>;


export type DeleteExperienceMutation = { __typename?: 'Mutation', deleteExperience: boolean };

export type GetExperienceQueryVariables = Exact<{
  getExperienceId: Scalars['String']['input'];
}>;


export type GetExperienceQuery = { __typename?: 'Query', getExperience: { __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, pictureUrl: string, location: [number, number], totalLikesCount: number } };

export type GetListOfExperienceCardsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListOfExperienceCardsQuery = { __typename?: 'Query', getListOfExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, pictureUrl: string, location: [number, number], totalLikesCount: number, user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, myId: string, username: string, profilePictureURL: string, userId: string }, liked?: { __typename?: 'ExperienceLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, experienceId: string } | null, likes: Array<{ __typename?: 'ExperienceLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, experienceId: string, user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: string } }> }> };

export type GetListOfExperiencesQueryVariables = Exact<{
  location?: InputMaybe<LocationInput>;
  userId?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetListOfExperiencesQuery = { __typename?: 'Query', getListOfExperiences: Array<{ __typename?: 'Experience', connectedMonumentId: string, location: [number, number], pictureUrl: string, userId: string, _databaseId: string, _permissions: Array<string>, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string, totalLikesCount: number, liked?: { __typename?: 'ExperienceLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, experienceId: string } | null, likes: Array<{ __typename?: 'ExperienceLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, experienceId: string, user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: string } }>, user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: string }, connectedMonument?: { __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], userId: string, name: string, about?: string | null, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, placeDetailId: string, transports: Array<any>, pictureURL: string, totalLikesCount: number, user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: string }, placeDetail: { __typename?: 'PlaceDetail', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, name: string }, likes: Array<{ __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string, user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: string } }>, liked?: { __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string } | null } | null }> };

export type GetListOfItemsForMapQueryVariables = Exact<{
  transports?: InputMaybe<Array<Scalars['Transport']['input']> | Scalars['Transport']['input']>;
  topics?: InputMaybe<Array<Scalars['Topic']['input']> | Scalars['Topic']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  location?: InputMaybe<LocationInput>;
}>;


export type GetListOfItemsForMapQuery = { __typename?: 'Query', getListOfExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, pictureUrl: string, connectedMonumentId: string, location: [number, number], user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: string } }>, getListOfMonuments: Array<{ __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], transports: Array<any>, userId: string, name: string, about?: string | null, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, placeDetailId: string, pictureURL: string, user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: string } }> };

export type GetListOfPlaceCardsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetListOfPlaceCardsQuery = { __typename?: 'Query', getListOfMonuments: Array<{ __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, transports: Array<any>, location: [number, number], userId: string, name: string, about?: string | null, placeDetailId: string, pictureURL: string, totalLikesCount: number, user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: string }, placeDetail: { __typename?: 'PlaceDetail', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, name: string }, likes: Array<{ __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string, user: { __typename?: 'User', _id: string, userId: string, myId: string, username: string, profilePictureURL: string } }>, liked?: { __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string } | null }>, getListOfExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, pictureUrl: string, location: [number, number], user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, myId: string, username: string, profilePictureURL: string, userId: string }, liked?: { __typename?: 'ExperienceLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, experienceId: string } | null, likes: Array<{ __typename?: 'ExperienceLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, experienceId: string, user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: string } }> }> };

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


export type GetListOfLikedMonumentCardsQuery = { __typename?: 'Query', getListOfMonumentLikeDocuments: Array<{ __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string, monument: { __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], userId: string, name: string, about?: string | null, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, placeDetailId: string, pictureURL: string, transports: Array<any>, questionId?: string | null, totalLikesCount: number, user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: string }, placeDetail: { __typename?: 'PlaceDetail', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, name: string }, likes: Array<{ __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string, user: { __typename?: 'User', _id: string, userId: string, myId: string, username: string, profilePictureURL: string } }>, liked?: { __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string } | null, question?: { __typename?: 'Question', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, question: string, correctAnswer?: string|number | null, pickingAnswers?: Array<string> | null, type: any } | null, usersAnswerToQuestion?: { __typename?: 'UsersAnswerToQuestion', answeredCorrectly: boolean } | null, usersConnectedExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, pictureUrl: string, location: [number, number], connectedMonumentId: string }> } }> };

export type CreateMonumentMutationVariables = Exact<{
  input: CreateMonumentInput;
}>;


export type CreateMonumentMutation = { __typename?: 'Mutation', createMonument: { __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], userId: string, name: string, about?: string | null, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, pictureURL: string, placeDetailId: string, transports: Array<any>, placeDetail: { __typename?: 'PlaceDetail', name: string, _databaseId: string, _permissions: Array<string>, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string }, usersConnectedExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, pictureUrl: string, location: [number, number], connectedMonumentId: string }> } };

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


export type GetListOfMonumentCardsQuery = { __typename?: 'Query', getListOfMonuments: Array<{ __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], userId: string, name: string, about?: string | null, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, placeDetailId: string, pictureURL: string, transports: Array<any>, totalLikesCount: number, user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: string }, placeDetail: { __typename?: 'PlaceDetail', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, name: string }, likes: Array<{ __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string, user: { __typename?: 'User', _id: string, userId: string, myId: string, username: string, profilePictureURL: string } }>, liked?: { __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string } | null, usersConnectedExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, pictureUrl: string, location: [number, number], connectedMonumentId: string }> }> };

export type GetListOfMonumentsForMapQueryVariables = Exact<{
  transports?: InputMaybe<Array<Scalars['Transport']['input']> | Scalars['Transport']['input']>;
  topics?: InputMaybe<Array<Scalars['Topic']['input']> | Scalars['Topic']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  location?: InputMaybe<LocationInput>;
}>;


export type GetListOfMonumentsForMapQuery = { __typename?: 'Query', getListOfMonuments: Array<{ __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], transports: Array<any>, userId: string, name: string, about?: string | null, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, placeDetailId: string, pictureURL: string, usersConnectedExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, pictureUrl: string, location: [number, number], connectedMonumentId: string }> }> };

export type GetMonumentQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetMonumentQuery = { __typename?: 'Query', getMonument: { __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], userId: string, name: string, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, about?: string | null, placeDetailId: string, pictureURL: string, transports: Array<any>, placeDetail: { __typename?: 'PlaceDetail', name: string, _databaseId: string, _permissions: Array<string>, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string } } };

export type GetMonumentCardQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetMonumentCardQuery = { __typename?: 'Query', getMonument: { __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], userId: string, name: string, about?: string | null, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, placeDetailId: string, pictureURL: string, transports: Array<any>, questionId?: string | null, totalLikesCount: number, user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: string }, placeDetail: { __typename?: 'PlaceDetail', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, name: string }, likes: Array<{ __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string, user: { __typename?: 'User', _id: string, userId: string, myId: string, username: string, profilePictureURL: string } }>, liked?: { __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string } | null, question?: { __typename?: 'Question', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, question: string, correctAnswer?: string|number | null, pickingAnswers?: Array<string> | null, type: any } | null, usersAnswerToQuestion?: { __typename?: 'UsersAnswerToQuestion', answeredCorrectly: boolean } | null, usersConnectedExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, pictureUrl: string, location: [number, number], connectedMonumentId: string }> } };

export type GetMonumentCardWithConnectedExperiencesQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetMonumentCardWithConnectedExperiencesQuery = { __typename?: 'Query', getMonument: { __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], userId: string, name: string, about?: string | null, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, placeDetailId: string, pictureURL: string, transports: Array<any>, questionId?: string | null, totalLikesCount: number, user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: string }, placeDetail: { __typename?: 'PlaceDetail', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, name: string }, likes: Array<{ __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string, user: { __typename?: 'User', _id: string, userId: string, myId: string, username: string, profilePictureURL: string } }>, liked?: { __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string } | null, connectedExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, pictureUrl: string, location: [number, number], connectedMonumentId: string, totalLikesCount: number, user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: string }, likes: Array<{ __typename?: 'ExperienceLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, experienceId: string, user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: string } }>, liked?: { __typename?: 'ExperienceLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, experienceId: string } | null }>, usersConnectedExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, pictureUrl: string, location: [number, number], connectedMonumentId: string }>, question?: { __typename?: 'Question', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, question: string, correctAnswer?: string|number | null, pickingAnswers?: Array<string> | null, type: any } | null } };

export type AnswerQuestionMutationVariables = Exact<{
  monumentId: Scalars['String']['input'];
  answer: Scalars['StringOrNumber']['input'];
}>;


export type AnswerQuestionMutation = { __typename?: 'Mutation', answerQuestion: { __typename?: 'UsersAnswerToQuestion', answeredCorrectly: boolean } };

export type CrateTourMutationVariables = Exact<{
  input: CreateTourInput;
}>;


export type CrateTourMutation = { __typename?: 'Mutation', createTour: { __typename?: 'Tour', tourName: string } };

export type GetListOfToursQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetListOfToursQuery = { __typename?: 'Query', getListOfTours: Array<{ __typename?: 'Tour', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, tourName: string, monumentIds: Array<string>, monuments: Array<{ __typename?: 'Monument', pictureURL: string }>, creator: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: string } }> };

export type GetTourQueryVariables = Exact<{
  tourId: Scalars['String']['input'];
}>;


export type GetTourQuery = { __typename?: 'Query', getTour: { __typename?: 'Tour', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, tourName: string, monumentIds: Array<string>, creator: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _databaseId: string, _permissions: Array<string>, userId: string, myId: string, username: string, profilePictureURL: string }, monuments: Array<{ __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], userId: string, name: string, about?: string | null, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, placeDetailId: string, pictureURL: string, transports: Array<any>, questionId?: string | null, totalLikesCount: number, user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: string }, placeDetail: { __typename?: 'PlaceDetail', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, name: string }, likes: Array<{ __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string, user: { __typename?: 'User', _id: string, userId: string, myId: string, username: string, profilePictureURL: string } }>, liked?: { __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string } | null, question?: { __typename?: 'Question', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, question: string, correctAnswer?: string|number | null, pickingAnswers?: Array<string> | null, type: any } | null, usersAnswerToQuestion?: { __typename?: 'UsersAnswerToQuestion', answeredCorrectly: boolean } | null, usersConnectedExperiences: Array<{ __typename?: 'Experience', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, pictureUrl: string, location: [number, number], connectedMonumentId: string }> }> } };


export const CreateAccountDocument = gql`
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
export const GetAccountDocument = gql`
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
export const GetListOfUsersDocument = gql`
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
export const GetProfileDocument = gql`
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
export const GetUserByMyIdDocument = gql`
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
export const UpdateProfilePictureDocument = gql`
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
export const LoginViaEmailDocument = gql`
    query loginViaEmail($email: String!, $password: String!) {
  logInViaEmail(email: $email, password: $password) {
    session
  }
}
    `;
export const LogoutDocument = gql`
    query logout {
  logout
}
    `;
export const SetSessionDocument = gql`
    query setSession($session: String!) {
  setSession(session: $session)
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
    pictureUrl
    location
  }
}
    `;
export const DeleteExperienceDocument = gql`
    mutation deleteExperience($experienceId: String!) {
  deleteExperience(experienceId: $experienceId)
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
    pictureUrl
    location
    totalLikesCount
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
    pictureUrl
    location
    totalLikesCount
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
export const GetListOfExperiencesDocument = gql`
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
      totalLikesCount
    }
    totalLikesCount
  }
}
    `;
export const GetListOfItemsForMapDocument = gql`
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
export const GetListOfPlaceCardsDocument = gql`
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
    totalLikesCount
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
export const LikeExperienceDocument = gql`
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
export const GetListOfLikedMonumentCardsDocument = gql`
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
      totalLikesCount
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
export const DeleteMonumentDocument = gql`
    mutation deleteMonument($monumentId: String!) {
  deleteMonument(monumentId: $monumentId)
}
    `;
export const GetListOfMonumentCardsDocument = gql`
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
    totalLikesCount
  }
}
    `;
export const GetListOfMonumentsForMapDocument = gql`
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
export const GetMonumentCardDocument = gql`
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
    totalLikesCount
  }
}
    `;
export const GetMonumentCardWithConnectedExperiencesDocument = gql`
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
      totalLikesCount
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
    totalLikesCount
  }
}
    `;
export const AnswerQuestionDocument = gql`
    mutation answerQuestion($monumentId: String!, $answer: StringOrNumber!) {
  answerQuestion(monumentId: $monumentId, answer: $answer) {
    answeredCorrectly
  }
}
    `;
export const CrateTourDocument = gql`
    mutation crateTour($input: CreateTourInput!) {
  createTour(input: $input) {
    tourName
  }
}
    `;
export const GetListOfToursDocument = gql`
    query getListOfTours($userId: String, $limit: Int, $offset: Int) {
  getListOfTours(userId: $userId, limit: $limit, offset: $offset) {
    _createdAt
    _updatedAt
    _collectionId
    _id
    _permissions
    _databaseId
    userId
    tourName
    monumentIds
    monuments {
      pictureURL
    }
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
      profilePictureURL
    }
  }
}
    `;
export const GetTourDocument = gql`
    query getTour($tourId: String!) {
  getTour(tourId: $tourId) {
    _createdAt
    _updatedAt
    _collectionId
    _id
    _permissions
    _databaseId
    userId
    tourName
    monumentIds
    creator {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _databaseId
      _permissions
      userId
      myId
      username
      profilePictureURL
    }
    monuments {
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
      totalLikesCount
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
    getAccount(variables?: GetAccountQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetAccountQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetAccountQuery>(GetAccountDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAccount', 'query');
    },
    getListOfUsers(variables?: GetListOfUsersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetListOfUsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetListOfUsersQuery>(GetListOfUsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getListOfUsers', 'query');
    },
    getProfile(variables: GetProfileQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetProfileQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetProfileQuery>(GetProfileDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProfile', 'query');
    },
    getUserByMyId(variables: GetUserByMyIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetUserByMyIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserByMyIdQuery>(GetUserByMyIdDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserByMyId', 'query');
    },
    updateProfilePicture(variables: UpdateProfilePictureQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateProfilePictureQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateProfilePictureQuery>(UpdateProfilePictureDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateProfilePicture', 'query');
    },
    loginViaEmail(variables: LoginViaEmailQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<LoginViaEmailQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<LoginViaEmailQuery>(LoginViaEmailDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'loginViaEmail', 'query');
    },
    logout(variables?: LogoutQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<LogoutQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<LogoutQuery>(LogoutDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'logout', 'query');
    },
    setSession(variables: SetSessionQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<SetSessionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SetSessionQuery>(SetSessionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'setSession', 'query');
    },
    createExperience(variables: CreateExperienceMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateExperienceMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateExperienceMutation>(CreateExperienceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createExperience', 'mutation');
    },
    deleteExperience(variables: DeleteExperienceMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteExperienceMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteExperienceMutation>(DeleteExperienceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteExperience', 'mutation');
    },
    getExperience(variables: GetExperienceQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetExperienceQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetExperienceQuery>(GetExperienceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getExperience', 'query');
    },
    getListOfExperienceCards(variables?: GetListOfExperienceCardsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetListOfExperienceCardsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetListOfExperienceCardsQuery>(GetListOfExperienceCardsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getListOfExperienceCards', 'query');
    },
    getListOfExperiences(variables?: GetListOfExperiencesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetListOfExperiencesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetListOfExperiencesQuery>(GetListOfExperiencesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getListOfExperiences', 'query');
    },
    getListOfItemsForMap(variables?: GetListOfItemsForMapQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetListOfItemsForMapQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetListOfItemsForMapQuery>(GetListOfItemsForMapDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getListOfItemsForMap', 'query');
    },
    getListOfPlaceCards(variables?: GetListOfPlaceCardsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetListOfPlaceCardsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetListOfPlaceCardsQuery>(GetListOfPlaceCardsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getListOfPlaceCards', 'query');
    },
    likeExperience(variables: LikeExperienceMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<LikeExperienceMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LikeExperienceMutation>(LikeExperienceDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'likeExperience', 'mutation');
    },
    likeMonument(variables: LikeMonumentMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<LikeMonumentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LikeMonumentMutation>(LikeMonumentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'likeMonument', 'mutation');
    },
    getListOfLikedMonumentCards(variables?: GetListOfLikedMonumentCardsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetListOfLikedMonumentCardsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetListOfLikedMonumentCardsQuery>(GetListOfLikedMonumentCardsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getListOfLikedMonumentCards', 'query');
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
    getListOfMonumentsForMap(variables?: GetListOfMonumentsForMapQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetListOfMonumentsForMapQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetListOfMonumentsForMapQuery>(GetListOfMonumentsForMapDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getListOfMonumentsForMap', 'query');
    },
    getMonument(variables: GetMonumentQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetMonumentQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMonumentQuery>(GetMonumentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getMonument', 'query');
    },
    getMonumentCard(variables: GetMonumentCardQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetMonumentCardQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMonumentCardQuery>(GetMonumentCardDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getMonumentCard', 'query');
    },
    getMonumentCardWithConnectedExperiences(variables: GetMonumentCardWithConnectedExperiencesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetMonumentCardWithConnectedExperiencesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMonumentCardWithConnectedExperiencesQuery>(GetMonumentCardWithConnectedExperiencesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getMonumentCardWithConnectedExperiences', 'query');
    },
    answerQuestion(variables: AnswerQuestionMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AnswerQuestionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AnswerQuestionMutation>(AnswerQuestionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'answerQuestion', 'mutation');
    },
    crateTour(variables: CrateTourMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CrateTourMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CrateTourMutation>(CrateTourDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'crateTour', 'mutation');
    },
    getListOfTours(variables?: GetListOfToursQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetListOfToursQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetListOfToursQuery>(GetListOfToursDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getListOfTours', 'query');
    },
    getTour(variables: GetTourQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetTourQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTourQuery>(GetTourDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTour', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;