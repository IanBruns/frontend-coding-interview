import Image from "next/image"

import { getImages } from "./api"
import type { Photo } from "./types"
import AuthCheck from "./AuthCheck"
import ImageDetails from "./ImageDetails"

export default async function ImagesPage() {
  const imageData = await getImages()

  return (
    <div className="p-4 overflow-auto flex items-center flex-col">
      <AuthCheck />
      <div className="w-96 lg:w-[550px] flex flex-col items-left mb-5">
        <Image
          className="mb-3"
          src="/logo.svg"
          alt="CI Logo"
          width={75}
          height={75}
        />
        <h1 className="font-bold text-xl font-sans">All Photos</h1>
      </div>
      {imageData?.photos.map((photo: Photo) => (
        <ImageDetails key={photo.id} photo={photo} />
      ))}
    </div>
  )
}
