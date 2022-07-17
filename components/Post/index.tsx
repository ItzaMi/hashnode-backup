import { FC } from 'react'

interface Props {
  cuid: string
  title: string
}

const Post: FC<Props> = ({ cuid, title }) => {
  const linkToPost = `https://www.hashnode.com/post/${cuid}`

  return (
    <a
      className="block text-xl font-semibold cursor-pointer"
      href={linkToPost}
      rel="noreferrer"
      target="_blank"
    >
      {title}
    </a>
  )
}

export default Post
