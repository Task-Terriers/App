import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import TaskTerriersSafeAreaView from '../Views/TaskTerriersSafeAreaView'
import { Col } from '../StyleToProps/Col'
import { Span } from '../StyleToProps'
import NavigationBar from '../components/NavigationBar'
import { IconNames } from '../components/types'
import { UniversalButton } from '../components/Buttons'
import { TaskTerriersNavigationModule } from '../modules/NavigationModule'
import { Auth, Root } from '../navigation/type'
import AsyncStorageModule from '../modules/AsyncStorageModule'

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
      TaskTerriersNavigationModule.navigate(Root.ServiceDetailScreen)
    )
  }
  const onPressToAddProfile = async () => {
    const userData = await AsyncStorageModule.GET_asyncStorage('USER_DATA')
    return (
      TaskTerriersNavigationModule.navigate('AuthAddProfileScreen', JSON.parse(userData))
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
        <UniversalButton size='medium' text={{ value: 'Go to Add profile Screen' }} onPress={onPressToAddProfile} />
      </Col>

    </TaskTerriersSafeAreaView>
  )
}

export default ServicesTab
