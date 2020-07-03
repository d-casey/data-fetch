import React from 'react'
import Pokemon from '../components/Pokemon'

const PokemonList = ({ pokemon }) => {
  return (
    <ul className="Pokemon-list">
      { pokemon.map(currentPokemon => <Pokemon key={currentPokemon.name} pokemon={currentPokemon} />) }
    </ul>
  )
}

export default PokemonList
