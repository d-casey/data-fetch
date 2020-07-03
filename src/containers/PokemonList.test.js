import React from 'react'
import { create } from 'react-test-renderer'
import PokemonList from './PokemonList'

test('it renders correctly', () => {
  const component = create(
    <PokemonList
      pokemon={
        [
          { name: 'bulbasaur', url: 'bulba.org' },
          { name: 'charmander', url: 'charm.org' },
          { name: 'squirtle', url: 'squirt.org' }
        ]
      }
    />
  )
  expect(component.toJSON()).toMatchSnapshot()
})
