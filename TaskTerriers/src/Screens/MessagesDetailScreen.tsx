import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import NavigationBar from '../components/NavigationBar'
import { IconNames } from '../components/types'
import { TaskTerriersNavigationModule } from '../modules/NavigationModule'
import TaskTerriersSafeAreaView from '../Views/TaskTerriersSafeAreaView'

interface Props {}

const MessagesDetailScreen = ({ navigation, route }) => {
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

  const onPressReturn = () => {
    TaskTerriersNavigationModule.goBack()
  }

  /*********
   * render
   *********/

  const renderNavBar = () => {
    return <NavigationBar title={'Chat'} iconName={IconNames['Return']} hasDivider iconAction={onPressReturn} />
  }

  /***********
   * render()
   ***********/

  return <TaskTerriersSafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>{renderNavBar()}</TaskTerriersSafeAreaView>
}

export default MessagesDetailScreen
