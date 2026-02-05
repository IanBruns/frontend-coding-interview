import {
  RenderResult,
  render as rtlRender,
  screen,
} from "@testing-library/react"

import ImagesPage from "./page"

type CustomRendererType = () => RenderResult

describe("CoursesRoute", () => {
  let render: CustomRendererType

  beforeEach(async () => {
    const tsx = await ImagesPage()
    render = () => rtlRender(tsx)
  })

  it("renders", () => {
    render()
    expect(screen.getByText("Images Page!")).toBeInTheDocument()
  })
})
