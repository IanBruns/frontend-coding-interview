import Image from "next/image"
import Link from "next/link"
import { FaStar } from "react-icons/fa"

import { getImages } from "./api"
import AuthCheck from "./AuthCheck"

type Photo = {
  alt: string
  id: number
  avg_color: string
  photographer: string
  photographer_url: string
  liked: boolean
  src: {
    medium: string
  }
}

export default async function ImagesPage() {
  const imageData = await getImages()

  return (
    <div className="p-4 overflow-auto flex items-center flex-col">
      <AuthCheck />
      <Image
        className="mb-3"
        src="/logo.svg"
        alt="CI Logo"
        width={75}
        height={75}
      />
      <h1 className="font-bold text-xl font-sans mb-3">All Photos</h1>
      {imageData?.photos.map((photo: Photo) => (
        <div key={photo.id} className="flex flex-row mb-2 h-full">
          <FaStar color={photo.liked ? "#FFD600" : "#9CA3AF"} />
          <div className="flex flex-row h-full items-center">
            <Image
              className="w-[75px] h-[75px] aspect-square rounded-lg mr-3"
              width={75}
              height={75}
              src={photo.src.medium}
              alt={photo.alt}
            />
            <div className="flex flex-col w-[219px] h-full">
              <p className="font-bold text-sm">{photo.photographer}</p>
              <p className="font-normal text-sm">{photo.alt}</p>
              <div className="flex items-center">
                <p
                  className="font-normal text-sm mr-3"
                  style={{ color: photo.avg_color }}
                >
                  {photo.avg_color}
                </p>
                <div
                  className="h-3 w-3"
                  style={{ backgroundColor: photo.avg_color }}
                />
              </div>
            </div>
          </div>
          <div className="lg:ml-10">
            <Link
              className="font-normal text-sm text-[#0075EB] hover:underline hover:cursor-pointer flex items-center"
              href={photo.photographer_url}
            >
              <Image src="/links.svg" alt="CI Logo" width={12} height={12} />
              Portfolio
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
