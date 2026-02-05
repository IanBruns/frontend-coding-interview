import {
  RenderResult,
  render as rtlRender,
  screen,
} from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import AuthPage from "./page"

type CustomRendererType = () => RenderResult

Object.defineProperty(window, "sessionStorage", {
  value: {
    setItem: jest.fn(),
  },
})

describe("CoursesRoute", () => {
  let render: CustomRendererType

  beforeEach(async () => {
    const jsx = await AuthPage()
    render = () => rtlRender(jsx)
  })

  it("renders", () => {
    render()
    expect(screen.getByText("Sign in to your account")).toBeInTheDocument()
    expect(screen.getByLabelText("UserName")).toBeInTheDocument()
    expect(screen.getByLabelText("Password")).toBeInTheDocument()
    expect(screen.getByText("Forgot password?")).toBeInTheDocument()
    expect(screen.getByText("Sign in")).toBeInTheDocument()
  })

  it("allows users to sign in with username and password and submits", async () => {
    render()
    await userEvent.type(screen.getByLabelText("Username"), "foo")
    await userEvent.type(screen.getByLabelText("Password"), "bar")
    await userEvent.click(screen.getByText("Sign in"))
    expect(window.sessionStorage.setItem).toHaveBeenCalledWith("userid", "foo")
  })
})
