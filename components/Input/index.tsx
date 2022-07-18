import { FC } from 'react'

interface Props {
  label?: string
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string
  value: string
}

const Input: FC<Props> = ({ label, onInputChange, placeholder, value }) => {
  return (
    <div className="flex flex-col">
      {label && <label className="mb-2 text-xs">{label}</label>}
      <input
        className="px-4 h-10 w-full sm:max-w-xs border-[1px] rounded-md"
        onChange={onInputChange}
        placeholder={placeholder}
        value={value}
      />
    </div>
  )
}

export default Input
