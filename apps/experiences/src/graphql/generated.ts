import client from './client';
import type { ApolloQueryResult, ObservableQuery, WatchQueryOptions } from '@apollo/client';
import { readable } from 'svelte/store';
import type { Readable } from 'svelte/store';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
	[_ in K]?: never;
};
export type Incremental<T> =
	| T
	| { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: { input: string; output: string };
	String: { input: string; output: string };
	Boolean: { input: boolean; output: boolean };
	Int: { input: number; output: number };
	Float: { input: number; output: number };
};

export type Post = {
	__typename?: 'Post';
	body?: Maybe<Scalars['String']['output']>;
	id: Scalars['Int']['output'];
	published: Scalars['Boolean']['output'];
	title: Scalars['String']['output'];
};

export type Query = {
	__typename?: 'Query';
	posts: Array<Post>;
	users: Array<User>;
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

export type PostsQueryVariables = Exact<{ [key: string]: never }>;

export type PostsQuery = {
	__typename?: 'Query';
	posts: Array<{ __typename?: 'Post'; id: number; body?: string | null }>;
};

export type PostsIdQueryVariables = Exact<{ [key: string]: never }>;

export type PostsIdQuery = {
	__typename?: 'Query';
	posts: Array<{ __typename?: 'Post'; id: number }>;
};

export const PostsDoc = gql`
	query Posts {
		posts {
			id
			body
		}
	}
`;
export const PostsIdDoc = gql`
	query PostsID {
		posts {
			id
		}
	}
`;
export const Posts = (
	options: Omit<WatchQueryOptions<PostsQueryVariables>, 'query'>
): Readable<
	ApolloQueryResult<PostsQuery> & {
		query: ObservableQuery<PostsQuery, PostsQueryVariables>;
	}
> => {
	const q = client.watchQuery({
		query: PostsDoc,
		...options
	});
	var result = readable<
		ApolloQueryResult<PostsQuery> & {
			query: ObservableQuery<PostsQuery, PostsQueryVariables>;
		}
	>({ data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q }, (set) => {
		q.subscribe((v: any) => {
			set({ ...v, query: q });
		});
	});
	return result;
};

export const PostsID = (
	options: Omit<WatchQueryOptions<PostsIdQueryVariables>, 'query'>
): Readable<
	ApolloQueryResult<PostsIdQuery> & {
		query: ObservableQuery<PostsIdQuery, PostsIdQueryVariables>;
	}
> => {
	const q = client.watchQuery({
		query: PostsIdDoc,
		...options
	});
	var result = readable<
		ApolloQueryResult<PostsIdQuery> & {
			query: ObservableQuery<PostsIdQuery, PostsIdQueryVariables>;
		}
	>({ data: {} as any, loading: true, error: undefined, networkStatus: 1, query: q }, (set) => {
		q.subscribe((v: any) => {
			set({ ...v, query: q });
		});
	});
	return result;
};
