import {
  RenderResult,
  render as rtlRender,
  screen,
} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useRouter } from "next/navigation"

import AuthPage from "./page"

type CustomRendererType = () => RenderResult

Object.defineProperty(window, "sessionStorage", {
  value: {
    setItem: jest.fn(),
  },
})

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}))

describe("CoursesRoute", () => {
  let render: CustomRendererType

  beforeEach(async () => {
    const tsx = await AuthPage()
    render = () => rtlRender(tsx)
  })

  it("renders", () => {
    render()
    expect(screen.getByText("Sign in to your account")).toBeInTheDocument()
    expect(screen.getByLabelText("Username")).toBeInTheDocument()
    expect(screen.getByLabelText("Password")).toBeInTheDocument()
    expect(screen.getByText("Forgot password?")).toBeInTheDocument()
    expect(screen.getByText("Sign in")).toBeInTheDocument()
  })

  it("allows users to sign in with username and password and submits", async () => {
    const push = jest.fn()

    ;(useRouter as jest.Mock).mockImplementation(() => ({
      push,
    }))

    render()
    await userEvent.type(screen.getByLabelText("Username"), "foo")
    await userEvent.type(screen.getByLabelText("Password"), "bar")
    await userEvent.click(screen.getByText("Sign in"))
    expect(window.sessionStorage.setItem).toHaveBeenCalledWith("userId", "foo")
    expect(useRouter().push).toHaveBeenCalledWith("/images")
  })

  it("prevents the user from submitting if username or password are blank", async () => {
    render()
    expect(screen.getByText("Sign in")).toBeDisabled()
    await userEvent.type(screen.getByLabelText("Username"), "foo")
    expect(screen.getByText("Sign in")).toBeDisabled()
    await userEvent.clear(screen.getByLabelText("Username"))
    await userEvent.type(screen.getByLabelText("Password"), "bar")
    expect(screen.getByText("Sign in")).toBeDisabled()
    await userEvent.type(screen.getByLabelText("Username"), "foo")
    expect(screen.getByText("Sign in")).not.toBeDisabled()
  })
})
