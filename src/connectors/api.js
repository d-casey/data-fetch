import axios from 'axios'

export const fetchPokemon = async () => {//async inside useEffect must be done inside
  const res = await axios('https://pokeapi.co/api/v2/pokemon?limit=151')
  return res.data.results
}

export const formatResults = (returnedPokemon) => {
  const formattedResults = returnedPokemon.map(async (pokemon) => {//async map to let us call the api each time
    let fullPokemonData = await axios(pokemon.url)
    let formattedPokemon = {
      name: pokemon.name,
      url: fullPokemonData.data.sprites.front_default
    }
    return formattedPokemon
  })
  return Promise.all(formattedResults)//formattedResults is an array of promises at this point. Need to resolve them
}
