import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import NavigationBar from '../components/NavigationBar'
import { IconNames } from '../components/types'
import { TaskTerriersNavigationModule } from '../modules/NavigationModule'
import TaskTerriersSafeAreaView from '../Views/TaskTerriersSafeAreaView'

interface Props { }

const ServiceDetailScreen = ({ navigation, route }) => {

  /**************************
   * props, navigation prams
   **************************/
  const headerTitle = route.params.title

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

  const title = () => {
    return (
      `${headerTitle}'s detail page`
    )
  }

  /*********
   * render
   *********/

  const renderNavBar = () => {
    return <NavigationBar title={title()} iconName={IconNames['Return']} hasDivider iconAction={onPressReturn} />
  }

  /***********
   * render()
   ***********/

  return <TaskTerriersSafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>{renderNavBar()}</TaskTerriersSafeAreaView>
}

export default ServiceDetailScreen
