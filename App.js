import React from 'react'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, Layout, Text, Button } from '@ui-kitten/components'

const HomeScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category="h1">HOME</Text>
    <Button>Hi there</Button>
  </Layout>
)

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <HomeScreen />
  </ApplicationProvider>
)
