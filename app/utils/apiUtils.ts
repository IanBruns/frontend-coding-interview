export async function get(endpoint: string) {
  const res = await fetch(endpoint, { cache: "no-store" })
  const data = await res.json()
  return data
}
