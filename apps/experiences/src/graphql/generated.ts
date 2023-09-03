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
};

export type EmailLogin = {
  __typename?: 'EmailLogin';
  success: Scalars['Boolean']['output'];
};

export type Post = {
  __typename?: 'Post';
  author: User;
  authors: Array<User>;
  body?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  published: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
};


export type PostAuthorArgs = {
  email: Scalars['String']['input'];
};

export type PostInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  published: Scalars['Boolean']['input'];
  title: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  logInViaEmail: EmailLogin;
  posts: Array<Post>;
  users: Array<User>;
};


export type QueryLogInViaEmailArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  posts: PostInput;
};


export type QueryPostsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  posts: Array<Post>;
  username: Scalars['String']['output'];
};

export type PostsQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', id: number, body?: string | null, author: { __typename?: 'User', id: number } }> };


export const PostsDocument = gql`
    query Posts($email: String!) {
  posts {
    id
    body
    author(email: $email) {
      id
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    Posts(variables: PostsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<PostsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<PostsQuery>(PostsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Posts', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;