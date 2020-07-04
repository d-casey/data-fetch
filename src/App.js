import React, { useState, useEffect } from 'react'
import PokemonList from './containers/PokemonList'
import { fetchPokemon, formatResults } from './connectors/api'
import './App.css'

const App = () => {
  const [pokemon, setPokemon] = useState(null)

  useEffect(() => {
    try {
      fetchPokemon()
        .then(data => {
          formatResults(data)
            .then(formattedData => setPokemon(formattedData))
        })
    } catch (err) {
      console.log('error fetching initial pokemon data', err)
    }
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Give me Pokemon!</h1>
      </header>
      <main className="Main">
        { pokemon &&
          <PokemonList pokemon={pokemon} />
        }
      </main>
    </div>
  );
}

export default App
