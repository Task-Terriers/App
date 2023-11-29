import React, { useCallback, useEffect, useState } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import auth, { firebase } from '@react-native-firebase/auth'

import { Col, Span } from './src/StyleToProps'
import useFonts from './src/hooks/useFonts'
import { firebaseAppOptions } from './src/utilities/firebase'
import Navigation from './src/navigation'
import { LogBox } from 'react-native'

export default function App() {
  const [IsReady, SetIsReady] = useState(false)
  LogBox.ignoreAllLogs();
  const LoadFonts = async () => {
    await useFonts()
  }

  useEffect(() => {
    async function prepare() {
      try {
        await LoadFonts()
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000))
      } catch (e) {
        console.warn(e)
      } finally {
        SetIsReady(true)
      }
    }

    prepare()
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseAppOptions)
    }
    const { currentUser } = auth()
    if (currentUser) console.log(currentUser)
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (IsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync()
    }
  }, [IsReady])

  if (!IsReady) {
    return null
  }

  return (
    <Col flex onLayout={onLayoutRootView} bgNeutral100>
      <StatusBar style={'dark'} backgroundColor={'white'} />
      <Navigation />
    </Col>
  )
}
