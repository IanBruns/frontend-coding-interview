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
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={e => {
          setUsername(e.target.value)
        }}
      />
      <label htmlFor="password">Password</label>
      <button
        onClick={() => {
          console.log("reset password feature incoming")
        }}
      >
        Forgot password?
      </button>
      <input
        type="text"
        id="password"
        value={password}
        onChange={e => {
          setPassword(e.target.value)
        }}
      />
      <button
        disabled={!username.length || !password.length}
        onClick={handleSignIn}
      >
        Sign in
      </button>
    </>
  )
}
