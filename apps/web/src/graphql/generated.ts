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
  session: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  logInViaEmail: EmailLogin;
};


export type QueryLogInViaEmailArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginViaEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginViaEmailQuery = { __typename?: 'Query', logInViaEmail: { __typename?: 'EmailLogin', session: string } };


export const LoginViaEmailDocument = gql`
    query LoginViaEmail($email: String!, $password: String!) {
  logInViaEmail(email: $email, password: $password) {
    session
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    LoginViaEmail(variables: LoginViaEmailQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<LoginViaEmailQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<LoginViaEmailQuery>(LoginViaEmailDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'LoginViaEmail', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;