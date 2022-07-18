import * as Types from './schemas'

export type PostFragment = {
  __typename?: 'Post'
  cuid?: string | null
  dateAdded?: string | null
  title?: string | null
  contentMarkdown?: string | null
}

export type PostsQueryVariables = Types.Exact<{
  username: Types.Scalars['String']
}>

export type PostsQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    name?: string | null
    publication?: {
      __typename?: 'Publication'
      posts?: Array<{
        __typename?: 'Post'
        cuid?: string | null
        dateAdded?: string | null
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
  Fragment: {
    Post: 'Post',
  },
}
