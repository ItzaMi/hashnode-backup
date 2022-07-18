import { FC } from 'react'

export enum BannerType {
  Error = 'error',
  Info = 'info',
  Success = 'success',
}

interface Props {
  text: string
  type: BannerType
}

const Banner: FC<Props> = ({ text, type }) => {
  const bannerTypeStyling = (type: BannerType) => {
    switch (type) {
      case BannerType.Error:
        return 'bg-red-100 border-red-400 text-red-800'
      case BannerType.Info:
      default:
        return 'bg-blue-100 border-blue-400 text-blue-800'
      case BannerType.Success:
        return 'bg-green-100 border-green-400 text-green-800'
    }
  }

  return (
    <div
      className={`px-4 py-4 border-2 rounded-md flex items-center text-sm ${bannerTypeStyling(
        type
      )} sm:py-0 sm:h-10 `}
    >
      {text}
    </div>
  )
}

export default Banner
