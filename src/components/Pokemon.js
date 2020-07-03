import React from 'react'

const Pokemon = ({ pokemon }) => {
  return (
    <li>
      <p>{pokemon.name}</p>
      <img src={pokemon.url} alt={pokemon.name} />
    </li>
  )
}

export default Pokemon
