import React from 'react'
import * as eva from '@eva-design/eva'
import { Platform } from 'react-native'
import { ApplicationProvider, IconRegistry, Layout, Text, Button } from '@ui-kitten/components'
import Test from './src/components/Test/Test.component'
import { FlexBox } from './src/components/FlexBox'
import { DropdownMenu } from './src/components/DropdownMenu'
import { default as mapping } from './src/theme/custom-mapping.json'
import { default as android } from './src/theme/android-custom-mappings.json'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import 'react-native-reanimated'

const HomeScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <FlexBox row gutter={3}>
      <Text category="h1">HOME</Text>
      <Button>Hi there</Button>
      <DropdownMenu />
    </FlexBox>

    <Test />
  </Layout>
)

export default function App() {
  const androidMapping = { ...mapping, strict: { ...mapping.strict, ...android.fontWeights } }
  const customMapping = Platform.OS === 'android' ? androidMapping : mapping
  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider customMapping={customMapping} {...eva} theme={eva.light}>
        <HomeScreen />
      </ApplicationProvider>
    </React.Fragment>
  )
}
