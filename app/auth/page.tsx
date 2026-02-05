"use server"

import LoginForm from "./LoginForm"

export default async function AuthPage() {
  return (
    <div>
      <h1>Sign in to your account</h1>
      <LoginForm />
    </div>
  )
}
