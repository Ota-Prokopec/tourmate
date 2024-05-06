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
  AnswerType: { input: 'radio' | 'text' | 'number'; output: 'radio' | 'text' | 'number'; }
  ColorTheme: { input: 'dark' | 'light'; output: 'dark' | 'light'; }
  Language: { input: 'en'|'cs'; output: 'en'|'cs'; }
  Location: { input: [number, number]; output: [number, number]; }
  StringOrNumber: { input: string|number; output: string|number; }
  Topic: { input: "castle" | "monument" | "person" | "animals" | "hiking"; output: "castle" | "monument" | "person" | "animals" | "hiking"; }
  Transport: { input: "train"|"bus"|	"car"|"walk"|"bike"; output: "train"|"bus"|	"car"|"walk"|"bike"; }
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

export type CreateMonumentCompletionInput = {
  monumentId: Scalars['String']['input'];
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
  liked?: Maybe<MonumentLike>;
  likes: Array<MonumentLike>;
  location: Scalars['Location']['output'];
  monumentCompletions: Array<MonumentCompletion>;
  name: Scalars['String']['output'];
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
};

export type MonumentCompletion = {
  __typename?: 'MonumentCompletion';
  _collectionId: Scalars['String']['output'];
  _createdAt: Scalars['String']['output'];
  _databaseId: Scalars['String']['output'];
  _id: Scalars['String']['output'];
  _permissions: Array<Scalars['String']['output']>;
  _updatedAt: Scalars['String']['output'];
  monument?: Maybe<Monument>;
  monumentId: Scalars['String']['output'];
  user: User;
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
  monument: Monument;
  monumentId: Scalars['String']['output'];
  user: User;
  userId: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  answerQuestion: UsersAnswerToQuestion;
  createMonument: Monument;
  createMonumentCompletion: MonumentCompletion;
  createTour: Tour;
  createTourCheckpointCompletion: TourCheckpointCompletion;
  deleteMonument: Scalars['Boolean']['output'];
  likeMonument: MonumentLike;
};


export type MutationAnswerQuestionArgs = {
  answer: Scalars['StringOrNumber']['input'];
  monumentId: Scalars['String']['input'];
};


export type MutationCreateMonumentArgs = {
  input: CreateMonumentInput;
};


export type MutationCreateMonumentCompletionArgs = {
  input: CreateMonumentCompletionInput;
};


export type MutationCreateTourArgs = {
  input: CreateTourInput;
};


export type MutationCreateTourCheckpointCompletionArgs = {
  monumentId: Scalars['String']['input'];
  tourId: Scalars['String']['input'];
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
  createAnonymousSession: Session;
  getAccount: Account;
  getListOfMonumentLikeDocuments: Array<MonumentLike>;
  getListOfMonuments: Array<Monument>;
  getListOfTours: Array<Tour>;
  getListOfUsers: Array<User>;
  getMonument: Monument;
  getSystemHealthStatus: SystemHealthStatus;
  getTour: Tour;
  getUser: User;
  logInViaEmail: Session;
  logout: Scalars['Boolean']['output'];
  setSession: Scalars['Boolean']['output'];
  updateProfilePicture: Account;
};


export type QueryCreateAccountArgs = {
  language: Scalars['Language']['input'];
  myId: Scalars['String']['input'];
  username: Scalars['String']['input'];
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
  tourName?: InputMaybe<Scalars['String']['input']>;
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

export type Session = {
  __typename?: 'Session';
  session: Scalars['String']['output'];
};

export type SystemHealthStatus = {
  __typename?: 'SystemHealthStatus';
  appwriteService: Scalars['Boolean']['output'];
  graphqlService: Scalars['Boolean']['output'];
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
  usersTourCheckpointsCompletionData: Array<TourCheckpointCompletion>;
};

export type TourCheckpointCompletion = {
  __typename?: 'TourCheckpointCompletion';
  _collectionId: Scalars['String']['output'];
  _createdAt: Scalars['String']['output'];
  _databaseId: Scalars['String']['output'];
  _id: Scalars['String']['output'];
  _permissions: Array<Scalars['String']['output']>;
  _updatedAt: Scalars['String']['output'];
  monumentId: Scalars['String']['output'];
  tourId: Scalars['String']['output'];
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

export type CreateAnonymousSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type CreateAnonymousSessionQuery = { __typename?: 'Query', createAnonymousSession: { __typename?: 'Session', session: string } };

export type LoginViaEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginViaEmailQuery = { __typename?: 'Query', logInViaEmail: { __typename?: 'Session', session: string } };

export type LogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutQuery = { __typename?: 'Query', logout: boolean };

export type SetSessionQueryVariables = Exact<{
  session: Scalars['String']['input'];
}>;


export type SetSessionQuery = { __typename?: 'Query', setSession: boolean };

export type LikeMonumentMutationVariables = Exact<{
  monumentId: Scalars['String']['input'];
}>;


export type LikeMonumentMutation = { __typename?: 'Mutation', likeMonument: { __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string } };

export type GetListOfLikedMonumentCardsQueryVariables = Exact<{
  offset?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetListOfLikedMonumentCardsQuery = { __typename?: 'Query', getListOfMonumentLikeDocuments: Array<{ __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string, monument: { __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], userId: string, name: string, about?: string | null, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, placeDetailId: string, pictureURL: string, transports: Array<"train"|"bus"|	"car"|"walk"|"bike">, questionId?: string | null, totalLikesCount: number, user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: string }, placeDetail: { __typename?: 'PlaceDetail', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, name: string }, likes: Array<{ __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string, user: { __typename?: 'User', _id: string, userId: string, myId: string, username: string, profilePictureURL: string } }>, liked?: { __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string } | null, question?: { __typename?: 'Question', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, question: string, correctAnswer?: string|number | null, pickingAnswers?: Array<string> | null, type: 'radio' | 'text' | 'number' } | null, usersAnswerToQuestion?: { __typename?: 'UsersAnswerToQuestion', answeredCorrectly: boolean } | null, monumentCompletions: Array<{ __typename?: 'MonumentCompletion', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string }> } }> };

export type CreateMonumentCompletionMutationVariables = Exact<{
  input: CreateMonumentCompletionInput;
}>;


export type CreateMonumentCompletionMutation = { __typename?: 'Mutation', createMonumentCompletion: { __typename?: 'MonumentCompletion', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string } };

export type CreateMonumentMutationVariables = Exact<{
  input: CreateMonumentInput;
}>;


export type CreateMonumentMutation = { __typename?: 'Mutation', createMonument: { __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], userId: string, name: string, about?: string | null, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, pictureURL: string, placeDetailId: string, transports: Array<"train"|"bus"|	"car"|"walk"|"bike">, placeDetail: { __typename?: 'PlaceDetail', name: string, _databaseId: string, _permissions: Array<string>, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string } } };

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


export type GetListOfMonumentCardsQuery = { __typename?: 'Query', getListOfMonuments: Array<{ __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], userId: string, name: string, about?: string | null, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, placeDetailId: string, pictureURL: string, transports: Array<"train"|"bus"|	"car"|"walk"|"bike">, totalLikesCount: number, user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: string }, placeDetail: { __typename?: 'PlaceDetail', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, name: string }, likes: Array<{ __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string, user: { __typename?: 'User', _id: string, userId: string, myId: string, username: string, profilePictureURL: string } }>, liked?: { __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string } | null, monumentCompletions: Array<{ __typename?: 'MonumentCompletion', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string }> }> };

export type GetListOfMonumentsForMapQueryVariables = Exact<{
  transports?: InputMaybe<Array<Scalars['Transport']['input']> | Scalars['Transport']['input']>;
  topics?: InputMaybe<Array<Scalars['Topic']['input']> | Scalars['Topic']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  location?: InputMaybe<LocationInput>;
}>;


export type GetListOfMonumentsForMapQuery = { __typename?: 'Query', getListOfMonuments: Array<{ __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], transports: Array<"train"|"bus"|	"car"|"walk"|"bike">, userId: string, name: string, about?: string | null, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, placeDetailId: string, pictureURL: string }> };

export type GetMonumentQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetMonumentQuery = { __typename?: 'Query', getMonument: { __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], userId: string, name: string, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, about?: string | null, placeDetailId: string, pictureURL: string, transports: Array<"train"|"bus"|	"car"|"walk"|"bike">, placeDetail: { __typename?: 'PlaceDetail', name: string, _databaseId: string, _permissions: Array<string>, _id: string, _collectionId: string, _updatedAt: string, _createdAt: string } } };

export type GetMonumentCardQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetMonumentCardQuery = { __typename?: 'Query', getMonument: { __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], userId: string, name: string, about?: string | null, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, placeDetailId: string, pictureURL: string, transports: Array<"train"|"bus"|	"car"|"walk"|"bike">, questionId?: string | null, totalLikesCount: number, user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: string }, placeDetail: { __typename?: 'PlaceDetail', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, name: string }, likes: Array<{ __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string, user: { __typename?: 'User', _id: string, userId: string, myId: string, username: string, profilePictureURL: string } }>, liked?: { __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string } | null, question?: { __typename?: 'Question', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, question: string, correctAnswer?: string|number | null, pickingAnswers?: Array<string> | null, type: 'radio' | 'text' | 'number' } | null, usersAnswerToQuestion?: { __typename?: 'UsersAnswerToQuestion', answeredCorrectly: boolean } | null, monumentCompletions: Array<{ __typename?: 'MonumentCompletion', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string }> } };

export type AnswerQuestionMutationVariables = Exact<{
  monumentId: Scalars['String']['input'];
  answer: Scalars['StringOrNumber']['input'];
}>;


export type AnswerQuestionMutation = { __typename?: 'Mutation', answerQuestion: { __typename?: 'UsersAnswerToQuestion', answeredCorrectly: boolean } };

export type GetSystemHealthStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSystemHealthStatusQuery = { __typename?: 'Query', getSystemHealthStatus: { __typename?: 'SystemHealthStatus', appwriteService: boolean, graphqlService: boolean } };

export type CrateTourMutationVariables = Exact<{
  input: CreateTourInput;
}>;


export type CrateTourMutation = { __typename?: 'Mutation', createTour: { __typename?: 'Tour', tourName: string } };

export type GetListOfToursQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  tourName?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetListOfToursQuery = { __typename?: 'Query', getListOfTours: Array<{ __typename?: 'Tour', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, tourName: string, monumentIds: Array<string>, monuments: Array<{ __typename?: 'Monument', pictureURL: string }>, creator: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: string } }> };

export type GetTourQueryVariables = Exact<{
  tourId: Scalars['String']['input'];
}>;


export type GetTourQuery = { __typename?: 'Query', getTour: { __typename?: 'Tour', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, tourName: string, monumentIds: Array<string>, creator: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _databaseId: string, _permissions: Array<string>, userId: string, myId: string, username: string, profilePictureURL: string }, monuments: Array<{ __typename?: 'Monument', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, location: [number, number], userId: string, name: string, about?: string | null, topics: Array<"castle" | "monument" | "person" | "animals" | "hiking">, placeDetailId: string, pictureURL: string, transports: Array<"train"|"bus"|	"car"|"walk"|"bike">, questionId?: string | null, totalLikesCount: number, user: { __typename?: 'User', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, myId: string, username: string, profilePictureURL: string }, placeDetail: { __typename?: 'PlaceDetail', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, name: string }, likes: Array<{ __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string, user: { __typename?: 'User', _id: string, userId: string, myId: string, username: string, profilePictureURL: string } }>, liked?: { __typename?: 'MonumentLike', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string } | null, question?: { __typename?: 'Question', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, question: string, correctAnswer?: string|number | null, pickingAnswers?: Array<string> | null, type: 'radio' | 'text' | 'number' } | null, usersAnswerToQuestion?: { __typename?: 'UsersAnswerToQuestion', answeredCorrectly: boolean } | null, monumentCompletions: Array<{ __typename?: 'MonumentCompletion', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, monumentId: string }> }>, usersTourCheckpointsCompletionData: Array<{ __typename?: 'TourCheckpointCompletion', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, tourId: string, monumentId: string }> } };

export type CreateTourCheckpointCompletionMutationVariables = Exact<{
  monumentId: Scalars['String']['input'];
  tourId: Scalars['String']['input'];
}>;


export type CreateTourCheckpointCompletionMutation = { __typename?: 'Mutation', createTourCheckpointCompletion: { __typename?: 'TourCheckpointCompletion', _createdAt: string, _updatedAt: string, _collectionId: string, _id: string, _permissions: Array<string>, _databaseId: string, userId: string, tourId: string, monumentId: string } };


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
export const CreateAnonymousSessionDocument = gql`
    query createAnonymousSession {
  createAnonymousSession {
    session
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
      totalLikesCount
      monumentCompletions {
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
export const CreateMonumentCompletionDocument = gql`
    mutation createMonumentCompletion($input: CreateMonumentCompletionInput!) {
  createMonumentCompletion(input: $input) {
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
    totalLikesCount
    monumentCompletions {
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
    totalLikesCount
    monumentCompletions {
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
export const AnswerQuestionDocument = gql`
    mutation answerQuestion($monumentId: String!, $answer: StringOrNumber!) {
  answerQuestion(monumentId: $monumentId, answer: $answer) {
    answeredCorrectly
  }
}
    `;
export const GetSystemHealthStatusDocument = gql`
    query getSystemHealthStatus {
  getSystemHealthStatus {
    appwriteService
    graphqlService
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
    query getListOfTours($userId: String, $limit: Int, $offset: Int, $tourName: String) {
  getListOfTours(
    userId: $userId
    limit: $limit
    offset: $offset
    tourName: $tourName
  ) {
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
      totalLikesCount
      monumentCompletions {
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
    usersTourCheckpointsCompletionData {
      _createdAt
      _updatedAt
      _collectionId
      _id
      _permissions
      _databaseId
      userId
      tourId
      monumentId
    }
  }
}
    `;
export const CreateTourCheckpointCompletionDocument = gql`
    mutation createTourCheckpointCompletion($monumentId: String!, $tourId: String!) {
  createTourCheckpointCompletion(monumentId: $monumentId, tourId: $tourId) {
    _createdAt
    _updatedAt
    _collectionId
    _id
    _permissions
    _databaseId
    userId
    tourId
    monumentId
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
    createAnonymousSession(variables?: CreateAnonymousSessionQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateAnonymousSessionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateAnonymousSessionQuery>(CreateAnonymousSessionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createAnonymousSession', 'query');
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
    likeMonument(variables: LikeMonumentMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<LikeMonumentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LikeMonumentMutation>(LikeMonumentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'likeMonument', 'mutation');
    },
    getListOfLikedMonumentCards(variables?: GetListOfLikedMonumentCardsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetListOfLikedMonumentCardsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetListOfLikedMonumentCardsQuery>(GetListOfLikedMonumentCardsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getListOfLikedMonumentCards', 'query');
    },
    createMonumentCompletion(variables: CreateMonumentCompletionMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateMonumentCompletionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateMonumentCompletionMutation>(CreateMonumentCompletionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createMonumentCompletion', 'mutation');
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
    answerQuestion(variables: AnswerQuestionMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AnswerQuestionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AnswerQuestionMutation>(AnswerQuestionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'answerQuestion', 'mutation');
    },
    getSystemHealthStatus(variables?: GetSystemHealthStatusQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetSystemHealthStatusQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetSystemHealthStatusQuery>(GetSystemHealthStatusDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getSystemHealthStatus', 'query');
    },
    crateTour(variables: CrateTourMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CrateTourMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CrateTourMutation>(CrateTourDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'crateTour', 'mutation');
    },
    getListOfTours(variables?: GetListOfToursQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetListOfToursQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetListOfToursQuery>(GetListOfToursDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getListOfTours', 'query');
    },
    getTour(variables: GetTourQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetTourQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTourQuery>(GetTourDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTour', 'query');
    },
    createTourCheckpointCompletion(variables: CreateTourCheckpointCompletionMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateTourCheckpointCompletionMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateTourCheckpointCompletionMutation>(CreateTourCheckpointCompletionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createTourCheckpointCompletion', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;