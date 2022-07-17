import { FC } from 'react'

interface Props {
  cuid: string
  isLastPost: boolean
  title: string
}

const Post: FC<Props> = ({ cuid, isLastPost, title }) => {
  const linkToPost = `https://www.hashnode.com/post/${cuid}`

  return (
    <a
      className={`block ${
        !isLastPost ? 'mb-4' : ''
      } max-w-fit text-xl font-semibold cursor-pointer hover:opacity-50`}
      href={linkToPost}
      rel="noreferrer"
      target="_blank"
    >
      {title}
    </a>
  )
}

export default Post
