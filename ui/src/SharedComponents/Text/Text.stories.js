import React from 'react'
import { storiesOf } from '@storybook/react'
import Text from './Text'

const sizeStories = storiesOf('sharedComponents / Text / sizes')
const SIZES = ['small', 'medium', 'large']
SIZES.forEach(size => sizeStories.add(size, () => <Text size={size}>Foo Bar</Text>))
