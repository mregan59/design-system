import React from 'react'
import { storiesOf } from '@storybook/react-native'

import { InfiniteScroll } from './InfiniteScroll'

storiesOf('InfiniteScroll', module).add('example', () => <InfiniteScroll />).add('default', () => <InfiniteScroll />)
