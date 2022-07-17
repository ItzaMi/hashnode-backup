import { FC, useState } from 'react'
import { Octokit } from 'octokit'

import { usePostsLazyQuery } from '../queries/autogenerate/hooks'

import ClientOnly from '../services/clientOnly'

import Button, { ButtonType } from '../components/Button'
import Banner, { BannerType } from '../components/Banner'
import Divider from '../components/Divider'
import Input from '../components/Input'
import Navbar from '../components/Navbar'
import StepHeading from '../components/StepHeading'
import Post from '../components/Post'

const Home: FC = () => {
  const [username, setUsername] = useState('')
  const [githubUsername, setGithubUsername] = useState('')
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
          `PUT /repos/${githubUsername}/${githubRepo}/contents/${path}`,
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
      <Navbar />
      <main className="mx-auto my-8 max-w-7xl">
        <div className="p-6 bg-white border-[1px] rounded-md">
          <div className="mb-4">
            <h1 className="mb-2 text-2xl text-slate-800 font-semibold">
              Hashnode Backup
            </h1>
            <p>
              Search for your Hashnode username, find your latest posts and back
              them up to a GitHub repository
            </p>
          </div>

          <Divider />

          <section>
            <StepHeading
              description="Search for your Hashnode username"
              title="Step 1"
            />
            <div className="flex items-end gap-x-2">
              <Input
                onInputChange={(e) => setUsername(e.target.value)}
                placeholder="Insert your Hashnode username"
                value={username}
              />
              <Button
                isDisabled={username === ''}
                label=" Get last 5 posts"
                onClick={() =>
                  getUserPosts({ variables: { username: username } })
                }
                type={ButtonType.Primary}
              />
            </div>
          </section>

          <Divider />

          <section>
            <StepHeading
              description="Look through your latest 5 posts"
              title="Step 2"
            />
            {!loading && !data && !error && (
              <Banner
                text="Please search for your username to get your latest posts"
                type={BannerType.Info}
              />
            )}

            {loading && <Banner text="Loading posts" type={BannerType.Info} />}

            {!loading && data?.user && (
              <div>
                {data.user.publication?.posts &&
                data.user.publication.posts?.length > 0 ? (
                  data.user.publication?.posts?.map((post, key) => (
                    <Post
                      cuid={post!.cuid!}
                      isLastPost={
                        key === data.user!.publication!.posts!.length - 1
                      }
                      key={key}
                      title={post!.title!}
                    />
                  ))
                ) : (
                  <Banner
                    text="It seems you haven't uploaded any posts so far!"
                    type={BannerType.Info}
                  />
                )}
              </div>
            )}

            {!loading && error && (
              <Banner
                text="Oh, no! It seems there was an error! Please try again."
                type={BannerType.Error}
              />
            )}
          </section>

          <Divider />

          <section>
            <StepHeading
              description="Now it's time to back up your posts. Please fill in the
              inputs with the required info"
              title="Step 3"
            />

            <div className="flex items-end gap-x-2">
              <Input
                label="Github username"
                onInputChange={(e) => setGithubUsername(e.target.value)}
                placeholder={'Insert your Github username'}
                value={githubUsername}
              />
              <Input
                label="Github key"
                onInputChange={(e) => setGithubKey(e.target.value)}
                placeholder="Insert your Github key"
                value={githubKey}
              />
              <Input
                label="Github repo"
                onInputChange={(e) => setGithubRepo(e.target.value)}
                placeholder="Insert your Github repo"
                value={githubRepo}
              />
              <Button
                isDisabled={
                  !data ||
                  githubUsername === '' ||
                  githubKey === '' ||
                  githubRepo === ''
                }
                label="Back up last 5 posts"
                onClick={() => triggerPostsBackup()}
                type={ButtonType.Secondary}
              />
              <Button
                isDisabled={
                  !data ||
                  githubUsername === '' ||
                  githubKey === '' ||
                  githubRepo === ''
                }
                label="Back up all posts"
                onClick={() => triggerPostsBackup()}
                type={ButtonType.Primary}
              />
            </div>
          </section>
        </div>
      </main>
    </ClientOnly>
  )
}

export default Home
