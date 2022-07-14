import * as Types from './schemas'

export type PostsQueryVariables = Types.Exact<{
  username: Types.Scalars['String']
}>

export type PostsQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    name?: string | null
    photo?: string | null
    publication?: {
      __typename?: 'Publication'
      posts?: Array<{
        __typename?: 'Post'
        title?: string | null
        contentMarkdown?: string | null
      } | null> | null
    } | null
  } | null
}

export const namedOperations = {
  Query: {
    Posts: 'Posts',
  },
}
