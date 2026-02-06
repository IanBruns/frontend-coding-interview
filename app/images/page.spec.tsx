import {
  RenderResult,
  render as rtlRender,
  screen,
} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useRouter } from "next/navigation"

import ImagesPage from "./page"

type CustomRendererType = () => RenderResult

jest.mock("./api", () => ({
  getImages: jest.fn(() => ({
    page: 1,
    per_page: 1,
    photos: [
      {
        id: 20727530,
        width: 4000,
        height: 6000,
        url: "https://www.pexels.com/photo/a-pink-scooter-parked-near-a-pier-with-a-view-of-the-water-20727530/",
        photographer: "Alex Ravvas",
        photographer_url: "https://www.pexels.com/@alexravvas",
        photographer_id: 30355703,
        avg_color: "#6F859D",
        src: {
          original:
            "https://images.pexels.com/photos/20727530/pexels-photo-20727530.jpeg",
          large2x:
            "https://images.pexels.com/photos/20727530/pexels-photo-20727530.jpeg?auto=compress\u0026cs=tinysrgb\u0026dpr=2\u0026h=650\u0026w=940",
          large:
            "https://images.pexels.com/photos/20727530/pexels-photo-20727530.jpeg?auto=compress\u0026cs=tinysrgb\u0026h=650\u0026w=940",
          medium:
            "https://images.pexels.com/photos/20727530/pexels-photo-20727530.jpeg?auto=compress\u0026cs=tinysrgb\u0026h=350",
          small:
            "https://images.pexels.com/photos/20727530/pexels-photo-20727530.jpeg?auto=compress\u0026cs=tinysrgb\u0026h=130",
          portrait:
            "https://images.pexels.com/photos/20727530/pexels-photo-20727530.jpeg?auto=compress\u0026cs=tinysrgb\u0026fit=crop\u0026h=1200\u0026w=800",
          landscape:
            "https://images.pexels.com/photos/20727530/pexels-photo-20727530.jpeg?auto=compress\u0026cs=tinysrgb\u0026fit=crop\u0026h=627\u0026w=1200",
          tiny: "https://images.pexels.com/photos/20727530/pexels-photo-20727530.jpeg?auto=compress\u0026cs=tinysrgb\u0026dpr=1\u0026fit=crop\u0026h=200\u0026w=280",
        },
        liked: false,
        alt: "A colorful scooter parked by a scenic seaside promenade under a clear blue sky.",
      },
    ],
    total_results: 8000,
    next_page:
      "https://api.pexels.com/v1/search?page=2\u0026per_page=1\u0026query=nature",
  })),
}))

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}))

const mockGetItem = jest.fn()

Object.defineProperty(window, "sessionStorage", {
  value: {
    getItem: mockGetItem,
  },
})

describe("CoursesRoute", () => {
  let render: CustomRendererType

  beforeEach(async () => {
    jest.clearAllMocks()
    const tsx = await ImagesPage()
    render = () => rtlRender(tsx)
  })

  it("renders", async () => {
    mockGetItem.mockReturnValueOnce("foo")
    render()
    expect(screen.getByText("All Photos")).toBeInTheDocument()
    expect(await screen.findByText("Alex Ravvas")).toBeInTheDocument()
    expect(
      screen.getByAltText(
        "A colorful scooter parked by a scenic seaside promenade under a clear blue sky.",
      ),
    ).toBeInTheDocument()
    expect(screen.getByText("#6F859D")).toBeInTheDocument()
    expect(
      screen.getByText(
        "A colorful scooter parked by a scenic seaside promenade under a clear blue sky.",
      ),
    ).toBeInTheDocument()
    expect(screen.getByText("Portfolio")).toHaveProperty(
      "href",
      "https://www.pexels.com/@alexravvas",
    )
  })

  it("redirects users to /auth if nothing in session storage", () => {
    const push = jest.fn()
    ;(useRouter as jest.Mock).mockImplementation(() => ({
      push,
    }))
    mockGetItem.mockReturnValueOnce(null)
    render()
    expect(useRouter().push).toHaveBeenCalledWith("/auth")
  })

  it("allows the user to like an image", async () => {
    mockGetItem.mockReturnValueOnce("foo")
    render()
    expect(screen.getByText("All Photos")).toBeInTheDocument()
    expect(screen.getByTestId("star-20727530")).toHaveStyle("color: #9CA3AF")
    await userEvent.click(screen.getByTestId("star-20727530"))
    expect(await screen.findByTestId("star-20727530")).toHaveStyle(
      "color: #FFD600",
    )
  })
})
