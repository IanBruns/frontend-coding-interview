import Image from "next/image"

import { getImages } from "./api"
import Link from "next/link"
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
    <div>
      <AuthCheck />
      <h1>All Photos</h1>
      {imageData?.photos.map((photo: Photo) => (
        <div key={photo.id}>
          <p>{photo.liked.toString()}</p>
          <Image
            src={photo.src.medium}
            alt={photo.alt}
            height={75}
            width={75}
          />
          <p>{photo.photographer}</p>
          <Link href={photo.photographer_url}>Portfolio</Link>
          <p>{photo.alt}</p>
          <p>{photo.avg_color}</p>
        </div>
      ))}
    </div>
  )
}
