// .storybook/preview.js

import React, {useEffect, useState} from 'react';
import * as eva from '@eva-design/eva'
import { Platform } from 'react-native'
import { ApplicationProvider, IconRegistry, Layout } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { default as mapping } from '../src/theme/custom-mapping.json'
import { default as android } from '../src/theme/android-custom-mappings.json'

import { RootStoreProvider, setupRootStore, useStores } from '../src/store'

export const decorators = [
  (Story) => {
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
            <ApplicationProvider customMapping={customMapping} {...eva} theme={eva.dark}>
                <Layout style={{padding: 20}}>
                <Story />
                </Layout>
            </ApplicationProvider>
        </RootStoreProvider>
      )
  }
];