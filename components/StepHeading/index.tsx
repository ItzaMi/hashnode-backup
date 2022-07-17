import { FC } from 'react'

interface Props {
  description: string
  title: string
}

const StepHeading: FC<Props> = ({ description, title }) => {
  return (
    <>
      <p className="mb-2  text-slate-800 font-semibold">{title}</p>
      <p className="mb-4">{description}</p>
    </>
  )
}

export default StepHeading
