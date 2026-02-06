import Image from "next/image"
import LoginForm from "./LoginForm"

export default function AuthPage() {
  return (
    <div className="flex items-center flex-col lg:w-screen lg:h-screen lg:justify-center">
      <Image
        className="mb-3"
        src="/logo.svg"
        alt="CI Logo"
        width={75}
        height={75}
      />
      <h1 className="font-bold text-xl font-sans mb-3">
        Sign in to your account
      </h1>
      <LoginForm />
    </div>
  )
}
