import pokemons from '../assets/pokemons.json'

export async function fetchServerHealth () {
  const protocol = import.meta.env.PROD ? 'https://' : 'http://'
  const url = import.meta.env.VITE_SERVER_URL
  const res = await fetch(`${protocol}${url}/healthz`)  
  return res.ok
}

export function prefetchImages() {
  for (const pokemon of Object.values(pokemons.pokemons)) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = pokemon.sprite;
    document.head.appendChild(link);
  }
}
