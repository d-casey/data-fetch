import React, { useState, useEffect } from 'react'
import PokemonList from './containers/PokemonList'
import axios from 'axios'
import './App.css'

const App = () => {
  const [pokemon, setPokemon] = useState(null)
  const [formatted, setFormatted] = useState(false)

  useEffect(() => {
    const fetchPokemon = async () => {
      const res = await axios('https://pokeapi.co/api/v2/pokemon?limit=151')
      const returnedPokemon = res && res.data && res.data.results
      setPokemon(returnedPokemon)
    }
    fetchPokemon()
  }, [])

  useEffect(() => {
    if (!formatted && pokemon) {
      const formatResults = (returnedPokemon) => {
        const formattedResults = returnedPokemon.map(async (pokemon) => {
          let fullPokemonData = await axios(pokemon.url)
          let formattedPokemon = {
            name: pokemon.name,
            url: fullPokemonData.data.sprites.front_default
          }
          return formattedPokemon
        })
        return Promise.all(formattedResults)
      }

      formatResults(pokemon)
        .then(data => setPokemon(data))
        .then(setFormatted(true))
    }
  }, [pokemon])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Give me Pokemon!</h1>
      </header>
      <main className="Main">
        { formatted && pokemon &&
          <PokemonList pokemon={pokemon} />
        }
      </main>
    </div>
  );
}

export default App
