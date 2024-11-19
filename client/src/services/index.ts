export async function fetchServerHealth () {
  const protocol = import.meta.env.PROD ? 'https://' : 'http://'
  const url = import.meta.env.VITE_SERVER_URL
  const res = await fetch(`${protocol}${url}`)  
  return res.ok
}
