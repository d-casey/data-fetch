import React, { useState, useEffect } from 'react'
import PokemonList from './containers/PokemonList'
import { fetchPokemon, formatResults } from './connectors/api'
import './App.css'

const App = () => {
  //using hooks. Array destructuring with state variable on left, function that updates that state variable on right
  //useState sets the initial value // TODO:
  const [pokemon, setPokemon] = useState(null)
  const [formatted, setFormatted] = useState(false)

  //useEffect is called on initial render, and updates. Like componentDidMount, comonentDidUpdate, componentWillUnmount
  useEffect(() => {
    try {
      fetchPokemon()
        .then(data => setPokemon(data))//updates the pokemon state variable
    } catch (err) {
      console.log('error fetching initial pokemon data', err)
    }

  }, [])//the empty array at the end means that this useEffect() hook will only be called when the component mounts

  //have a second useEffect function that will map over the items returned from the first fetch, and perform another
  //async call to get the image url for the pokemon.
  useEffect(() => {
    if (!formatted && pokemon) {//this will only run if the data hasn't been formatted, so it will do it once after the first useEffect function is complete, and the component has then updated after the state variable is updated
      try {
        formatResults(pokemon)//returns a promise, so no need for the formatResults function to be async
          .then(data => setPokemon(data))
          .then(setFormatted(true))
      } catch(err) {
        console.log('error formatting received pokemon data', err)
      }
    }
  }, [pokemon])//the value here denotes the value this hook will be listening for when the component updates

  //next thing to try is useReducer to manage the state. I perform two updates after formatting the results, would be nice to just
  //do one state update.

  //few gotchas with fetch. You need to do a 2 step process to get the response as JSON. It does not automatically hit the catch block always

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
