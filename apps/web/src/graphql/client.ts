import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache({
	addTypename: false
});

export default new ApolloClient({
	// Provide required constructor fields
	cache: cache,
	uri: 'http://localhost:4444/graphql',
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
