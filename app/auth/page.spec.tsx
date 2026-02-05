import {
  RenderResult,
  render as rtlRender,
  screen,
} from "@testing-library/react"
import AuthPage from "./page"

type OverridesType = {}

type CustomRendererType = (overrides?: Partial<OverridesType>) => RenderResult

describe("CoursesRoute", () => {
  let render: CustomRendererType

  beforeEach(async () => {
    const jsx = await AuthPage()
    render = () => rtlRender(jsx)
  })

  it("renders", () => {
    render()
    expect(screen.getByText("Auth Page!")).toBeInTheDocument()
  })
})
