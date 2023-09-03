import { ApolloClient, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache();

export default new ApolloClient({
	// Provide required constructor fields
	cache: cache,
	uri: 'http://localhost:4444/graphql',
	credentials: 'include',
	queryDeduplication: false,
	defaultOptions: {
		watchQuery: {
			fetchPolicy: 'cache-and-network'
		}
	}
});
