"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AuthCheck() {
  const router = useRouter()

  useEffect(() => {
    if (!window.sessionStorage.getItem("userId")) {
      router.push("/")
    }
  })
  return <></>
}
