"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSignIn = () => {
    window.sessionStorage.setItem("userId", username)
    router.push("/images")
  }

  return (
    <>
      <div className="flex items-left flex-col w-[319px] mb-3">
        <label className="font-bold text-sm text-[#111827]" htmlFor="username">
          Username
        </label>
        <input
          className="border border-[#9CA3AF] rounded-lg h-11"
          type="text"
          id="username"
          value={username}
          onChange={e => {
            setUsername(e.target.value)
          }}
        />
      </div>
      <div className="w-[319px] mb-3">
        <div className="flex justify-between">
          <label
            className="font-bold text-sm text-[#111827]"
            htmlFor="password"
          >
            Password
          </label>
          <button
            className="font-normal text-sm text-[#0075EB] hover:underline cursor-pointer"
            onClick={() => {
              console.log("reset password feature incoming")
            }}
          >
            Forgot password?
          </button>
        </div>
        <input
          className="border border-[#9CA3AF] rounded-lg w-[319px] h-11"
          type="password"
          id="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value)
          }}
        />
      </div>
      <button
        className="w-[319px] h-11 bg-[#0075EB] rounded-lg cursor-pointer font-bold text-base text-white disabled:cursor-not-allowed"
        disabled={!username.length || !password.length}
        onClick={handleSignIn}
      >
        Sign in
      </button>
    </>
  )
}
