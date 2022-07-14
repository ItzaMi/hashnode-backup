import { ApolloClient, InMemoryCache } from '@apollo/client'

/**
 * Investigate the possibility of using GitHub's GraphQL API
 * by using two different clients here
 * https://www.loudnoises.us/next-js-two-apollo-clients-two-graphql-data-sources-the-easy-way/
 */

const client = new ApolloClient({
  uri: 'https://api.hashnode.com/',
  cache: new InMemoryCache(),
})

export default client
