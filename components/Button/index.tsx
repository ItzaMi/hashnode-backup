import { FC } from 'react'

interface Props {
  isDisabled: boolean
  label: string
  onClick: (ev: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: FC<Props> = ({ isDisabled, label, onClick }) => {
  return (
    <button
      className="ml-2 px-4 h-10 bg-blue-700 rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={isDisabled}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default Button
