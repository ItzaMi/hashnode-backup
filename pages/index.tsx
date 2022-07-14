import { FC, useState } from 'react'

import { usePostsLazyQuery, usePostsQuery } from '../queries/autogenerate/hooks'

import ClientOnly from '../services/clientOnly'

const Home: FC = () => {
  const [username, setUsername] = useState('')

  const [getUserPosts, { data, loading, error }] = usePostsLazyQuery()

  return (
    <ClientOnly>
      <h1>Hashnode Backup</h1>
      <p>
        Search for your Hashnode username, find your latest posts and back them
        up to a GitHub repository
      </p>
      <input
        placeholder="Insert your Hashnode username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        onClick={() => getUserPosts({ variables: { username: username } })}
      >
        Get last 5 posts
      </button>

      {loading && <p>Loading posts</p>}

      {!loading && data?.user && (
        <p>
          {data.user.publication?.posts?.map((post) => (
            <p>{post?.title}</p>
          ))}
        </p>
      )}

      {!loading && error && (
        <p>Oh, no! It seems there was an error! Please try again.</p>
      )}
    </ClientOnly>
  )
}

export default Home
