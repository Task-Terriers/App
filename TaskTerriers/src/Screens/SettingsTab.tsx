import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth';

import TaskTerriersSafeAreaView from '../Views/TaskTerriersSafeAreaView'
import NavigationBar from '../components/NavigationBar'
import { IconNames } from '../components/types'
import { WarningButton } from '../components/Buttons'
import { TaskTerriersNavigationModule } from '../modules/NavigationModule';
import { Root } from '../navigation/type';

interface Props { }

const SettingsTab = ({ navigation, route }) => {
  /*********
   * recoil
   *********/

  /**************************
   * props, navigation prams
   **************************/

  /*************
   * state, ref
   *************/

  const [isRendering, setIsRendering] = useState<boolean>(true)

  /**************
   * life cycles
   **************/

  useEffect(() => {
    // ComponentDidMount

    // setIsRendering(false)
    return () => {
      // ComponentWillUnmount
    }
  }, [])

  /************
   * functions
   ************/

  const onPressSignOut = () => {
    return (
      auth().signOut().then(() => { TaskTerriersNavigationModule.navigate(Root.AuthLoginMainScreen), console.log('User signed out!') })

    )
  }

  /*********
   * render
   *********/

  // if (isRendering === true) {
  // return null
  // }

  /***********
   * render()
   ***********/

  return (
    <TaskTerriersSafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <NavigationBar iconName={IconNames['Setting']} title={route.name} />
      <WarningButton size='medium' text={{ value: 'Sign out' }} onPress={onPressSignOut} warningStyle='fill' />
    </TaskTerriersSafeAreaView>
  )
}

export default SettingsTab
