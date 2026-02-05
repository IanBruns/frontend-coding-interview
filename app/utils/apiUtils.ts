export async function get(endpoint: string, headers: object) {
  const res = await fetch(endpoint, { cache: "no-store", ...headers })
  const data = await res.json()
  return data
}
