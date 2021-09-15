// .storybook/preview.js

import React from 'react';
import * as eva from '@eva-design/eva'
import { Platform } from 'react-native'
import { ApplicationProvider, IconRegistry, Layout } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { default as mapping } from '../src/theme/custom-mapping.json'
import { default as android } from '../src/theme/android-custom-mappings.json'


export const decorators = [
  (Story) => {
    const androidMapping = { ...mapping, strict: { ...mapping.strict, ...android.fontWeights } }
    const customMapping = Platform.OS === 'android' ? androidMapping : mapping
      return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider customMapping={customMapping} {...eva} theme={eva.dark}>
                <Layout style={{padding: 20}}>
                <Story />
                </Layout>
            </ApplicationProvider>
        </>
      )
  }
];