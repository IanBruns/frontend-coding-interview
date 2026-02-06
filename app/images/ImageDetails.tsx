"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { FaStar } from "react-icons/fa"

import { Photo } from "./types"

export default function ImageDetails({
  photo: { liked, id, src, alt, photographer, photographer_url, avg_color },
}: {
  photo: Photo
}) {
  const [isLiked, setIsLiked] = useState(liked)

  return (
    <div key={id} className="flex flex-row mb-2 h-full">
      <FaStar
        data-testid={`star-${id}`}
        className="hover:cursor-pointer"
        color={isLiked ? "#FFD600" : "#9CA3AF"}
        onClick={() => {
          setIsLiked(!isLiked)
        }}
      />
      <div className="flex flex-row h-full items-center">
        <Image
          className="w-[75px] h-[75px] aspect-square rounded-lg mr-3"
          width={75}
          height={75}
          src={src.medium}
          alt={alt}
        />
        <div className="flex flex-col w-[219px] h-full">
          <p className="font-bold text-sm">{photographer}</p>
          <p className="font-normal text-sm">{alt}</p>
          <div className="flex items-center">
            <p
              className="font-normal text-sm mr-3"
              style={{ color: avg_color }}
            >
              {avg_color}
            </p>
            <div className="h-3 w-3" style={{ backgroundColor: avg_color }} />
          </div>
        </div>
      </div>
      <div className="lg:ml-40">
        <Link
          className="font-normal text-sm text-[#0075EB] hover:underline hover:cursor-pointer flex items-center"
          href={photographer_url}
        >
          <Image src="/links.svg" alt="CI Logo" width={12} height={12} />
          Portfolio
        </Link>
      </div>
    </div>
  )
}
