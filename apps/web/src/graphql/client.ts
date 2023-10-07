import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const cache = new InMemoryCache({
	addTypename: false
});

export default new ApolloClient({
	// Provide required constructor fields
	cache: cache,
	uri: 'https://d10bbhb5-4444.euw.devtunnels.ms/graphql',
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
