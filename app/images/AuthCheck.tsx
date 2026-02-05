"use client"
import { useRouter } from "next/navigation"

export default function AuthCheck() {
  const router = useRouter()

  if (!window.sessionStorage.getItem("userId")) {
    router.push("/auth")
  }
  return <></>
}
