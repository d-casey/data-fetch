import React from 'react'
import { create } from 'react-test-renderer'
import Pokemon from './Pokemon'

test('Pokemon renders as expected', () => {
  const component = create(
    <Pokemon pokemon={{ name: 'bulba', url: 'bulbapedia.org' }} />
  )

  expect(component.toJSON()).toMatchSnapshot()
})
