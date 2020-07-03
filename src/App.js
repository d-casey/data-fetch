import React, { useState, useEffect } from 'react'
import PokemonList from './containers/PokemonList'
import axios from 'axios'
import './App.css'

const App = () => {
  //using hooks. Array destructuring with state variable on left, function that updates that state variable on right
  //useState sets the initial value // TODO:
  const [pokemon, setPokemon] = useState(null)
  const [formatted, setFormatted] = useState(false)

  //useEffect is called on initial render, and updates. Like componentDidMount, comonentDidUpdate, componentWillUnmount
  useEffect(() => {
    const fetchPokemon = async () => {//async inside useEffect must be done inside
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      const jsonRes = await res.json()
      setPokemon(jsonRes.results)//updates the pokemon state variable
    }
    fetchPokemon()
  }, [])//the empty array at the end means that this useEffect() hook will only be called when the component mounts

  //have a second useEffect function that will map over the items returned from the first fetch, and perform another
  //async call to get the image url for the pokemon.
  useEffect(() => {
    if (!formatted && pokemon) {//this will only run if the data hasn't been formatted, so it will do it once after the first useEffect function is complete, and the component has then updated after the state variable is updated
      const formatResults = (returnedPokemon) => {
        const formattedResults = returnedPokemon.map(async (pokemon) => {//async map to let us call the api each time
          let fullPokemonData = await fetch(pokemon.url)
          let fullPokemonDataRes = await fullPokemonData.json()
          let formattedPokemon = {
            name: pokemon.name,
            url: fullPokemonDataRes.sprites.front_default
          }
          return formattedPokemon
        })
        return Promise.all(formattedResults)//formattedResults is an array of promises at this point. Need to resolve them
      }

      formatResults(pokemon)//returns a promise, so no need for the formatResults function to be async
        .then(data => setPokemon(data))
        .then(setFormatted(true))
    }
  }, [pokemon])//the value here denotes the value this hook will be listening for when the component updates

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

//useful
//https://www.robinwieruch.de/react-hooks-fetch-data
//https://stackoverflow.com/questions/42489918/async-await-inside-arraymap
