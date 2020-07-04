import React, { useState, useEffect } from 'react'
import PokemonList from './containers/PokemonList'
import { fetchPokemon, formatResults } from './connectors/api'
import './App.css'

const App = () => {
  const [pokemon, setPokemon] = useState(null)
  const [formatted, setFormatted] = useState(false)

  useEffect(() => {
    try {
      fetchPokemon()
        .then(data => setPokemon(data))
    } catch (err) {
      console.log('error fetching initial pokemon data', err)
    }

  }, [])

  useEffect(() => {
    if (!formatted && pokemon) {
      try {
        formatResults(pokemon)
          .then(data => setPokemon(data))
          .then(setFormatted(true))
      } catch(err) {
        console.log('error formatting received pokemon data', err)
      }
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
