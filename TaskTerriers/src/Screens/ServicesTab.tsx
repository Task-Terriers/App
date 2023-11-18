import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import TaskTerriersSafeAreaView from '../Views/TaskTerriersSafeAreaView'
import { Col } from '../StyleToProps/Col'
import { Span } from '../StyleToProps'
import NavigationBar from '../components/NavigationBar'
import { IconNames } from '../components/types'
import { UniversalButton } from '../components/Buttons'
import { TaskTerriersNavigationModule } from '../modules/NavigationModule'
import { Root } from '../navigation/type'

interface Props { }

const ServicesTab = ({ route }) => {
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

  const onPressButton = () => {
    return (
      TaskTerriersNavigationModule.navigate('ServiceDetailScreen')
    )
  }
  const onPressToLogin = () => {
    return (
      TaskTerriersNavigationModule.navigate('AuthLoginMainScreen')
    )
  }

  /*********
   * render
   *********/

  const renderNavigationBar = () => {
    return <NavigationBar iconName={IconNames['Service']} title={route.name} />
  }

  const renderButton = () => {
    return <UniversalButton size='medium' text={{ value: 'Go to Detail Screen' }} onPress={onPressButton} />
  }

  /***********
   * render()
   ***********/

  return (
    <TaskTerriersSafeAreaView style={{ flex: 1 }}>
      {renderNavigationBar()}
      <Col p16>
        {renderButton()}
        <UniversalButton size='medium' text={{ value: 'Go to Login Screen' }} onPress={onPressToLogin} />
      </Col>

    </TaskTerriersSafeAreaView>
  )
}

export default ServicesTab
