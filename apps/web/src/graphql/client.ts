import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import clientOptions from './clientOptions';

const cache = new InMemoryCache({
	addTypename: false
});

export default new ApolloClient({
	// Provide required constructor fields
	cache: cache,
	uri: clientOptions[0],
	credentials: 'same-origin',
	queryDeduplication: false,
	defaultOptions: {
		watchQuery: {
			fetchPolicy: 'cache-and-network'
		}
	}
});

/*
query Posts($email: String!) {
	posts {
		id
		body
		author(email: $email) {
			id
		}
	}
}*/
