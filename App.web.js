import React, { useEffect, useState } from 'react'
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
import { RootStoreProvider, setupRootStore, useStores } from './src/store'
import { observer } from 'mobx-react-lite'

const HomeScreen = observer(() => {
  const { test } = useStores()

  const onPress = () => {
    test.setName('HARRY')
  }
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlexBox row gutter={3}>
        <Text category="h1">HOME</Text>
        <Button onPress={onPress}>{test.name}</Button>
        <DropdownMenu />
      </FlexBox>

      <Test />
    </Layout>
  )
})

export const Root = () => {
  const androidMapping = { ...mapping, strict: { ...mapping.strict, ...android.fontWeights } }
  const customMapping = Platform.OS === 'android' ? androidMapping : mapping
  const [rootStore, setRootStore] = useState(undefined)

  // Kick off initial async loading actions, like loading fonts and RootStore
  useEffect(() => {
    const method = async () => {
      // await initFonts() // expo
      setupRootStore().then(setRootStore)
    }
    method()
  }, [])

  if (!rootStore) {
    return null
  }

  return (
    <RootStoreProvider value={rootStore}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider customMapping={customMapping} {...eva} theme={eva.light}>
        <HomeScreen />
      </ApplicationProvider>
    </RootStoreProvider>
  )
}

export default function App() {
  return <Root />
}
