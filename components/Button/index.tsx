import { FC } from 'react'

export enum ButtonType {
  Primary = 'primary',
  Secondary = 'secondary',
}

interface Props {
  isDisabled: boolean
  label: string
  onClick: (ev: React.MouseEvent<HTMLButtonElement>) => void
  type: ButtonType
}

const Button: FC<Props> = ({ isDisabled, label, onClick, type }) => {
  const buttonStyle = (type: ButtonType) => {
    switch (type) {
      case ButtonType.Primary:
      default:
        return 'bg-blue-700 text-white'
      case ButtonType.Secondary:
        return 'bg-white text-blue-700 border-[1px] border-blue-700'
    }
  }

  return (
    <button
      className={`ml-2 px-4 h-10 rounded-md ${buttonStyle(
        type
      )} disabled:opacity-50 disabled:cursor-not-allowed`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export default Button
