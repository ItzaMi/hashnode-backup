import { FC, useState } from 'react'
import { Octokit } from 'octokit'

import { usePostsLazyQuery, usePostsQuery } from '../queries/autogenerate/hooks'

import ClientOnly from '../services/clientOnly'

const Home: FC = () => {
  const [username, setUsername] = useState('')
  const [githubOwner, setGithubOwner] = useState('')
  const [githubKey, setGithubKey] = useState('')
  const [githubRepo, setGithubRepo] = useState('')

  const [getUserPosts, { data, loading, error }] = usePostsLazyQuery()

  const triggerPostsBackup = () => {
    const postsData = data?.user?.publication?.posts!.slice(0, 5)

    postsData?.forEach(async (post) => {
      const octokit = new Octokit({
        auth: githubKey,
      })

      const path =
        post
          ?.title!.toLowerCase()
          .replace(/ /g, '-')
          .replace(/[^\w-]+/g, '') + '.md'

      try {
        await octokit.request(
          `PUT /repos/${githubOwner}/${githubRepo}/contents/${path}`,
          {
            owner: 'OWNER',
            repo: 'REPO',
            path: 'PATH',
            message: post?.title,
            content: Buffer.from(post?.contentMarkdown!).toString('base64'),
          }
        )
      } catch (error) {
        console.log(error)
      }
    })
  }

  return (
    <ClientOnly>
      <h1>Hashnode Backup</h1>
      <div>
        <h3>
          Search for your Hashnode username, find your latest posts and back
          them up to a GitHub repository
        </h3>
        <input
          placeholder="Insert your Hashnode username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          onClick={() => getUserPosts({ variables: { username: username } })}
        >
          Get last 5 posts
        </button>
      </div>

      {loading && <p>Loading posts</p>}

      {!loading && data?.user && (
        <div>
          {data.user.publication?.posts?.map((post) => (
            <p>{post?.title}</p>
          ))}
        </div>
      )}

      {!loading && error && (
        <p>Oh, no! It seems there was an error! Please try again.</p>
      )}

      <div>
        <h3>
          Now it's time to back up your posts. Please fill in the inputs with
          the required info
        </h3>
        <div>
          <label htmlFor="github-username">GitHub Username</label>
          <input
            placeholder="Insert your Github username"
            name="github-username"
            onChange={(e) => setGithubOwner(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="github-key">GitHub Key</label>
          <input
            placeholder="Insert your Github key"
            name="github-key"
            onChange={(e) => setGithubKey(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="github-repo">GitHub Repo</label>
          <input
            placeholder="Insert your Github repo"
            name="github-repo"
            onChange={(e) => setGithubRepo(e.target.value)}
          />
        </div>
        <button disabled={!data} onClick={() => triggerPostsBackup()}>
          Back up posts
        </button>
      </div>
    </ClientOnly>
  )
}

export default Home
