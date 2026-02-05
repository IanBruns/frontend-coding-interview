import { get } from "../utils"

export async function getImages() {
  return get("https://api.pexels.com/v1/search?query=nature&per_page=10", {
    Authorization: "Mz0iC21IFLz9HuN8ypIbJ54l8OuGnpW2IsVoQrYBEyagQXt1YeBEA7H0",
  })
}
