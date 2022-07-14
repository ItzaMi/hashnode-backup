import * as Types from './operations'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const

export const PostsDocument = gql`
  query Posts($username: String!) {
    user(username: $username) {
      name
      photo
      publication {
        posts {
          title
          contentMarkdown
        }
      }
    }
  }
`

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function usePostsQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.PostsQuery,
    Types.PostsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<Types.PostsQuery, Types.PostsQueryVariables>(
    PostsDocument,
    options
  )
}
export function usePostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.PostsQuery,
    Types.PostsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<Types.PostsQuery, Types.PostsQueryVariables>(
    PostsDocument,
    options
  )
}
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>
export type PostsQueryResult = Apollo.QueryResult<
  Types.PostsQuery,
  Types.PostsQueryVariables
>
