import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import TaskTerriersSafeAreaView from '../Views/TaskTerriersSafeAreaView'
import { Col } from '../StyleToProps/Col'
import { Span } from '../StyleToProps'
import NavigationBar from '../components/NavigationBar'
import { IconNames } from '../components/types'

interface Props { }

const ServicesTab = ({ navigation, route }) => {
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
      <NavigationBar iconName={IconNames['Service']} title={route.name} />
      <Col bgAlertMinor>
        <Span> this is the ServicesTab</Span>
      </Col>
    </TaskTerriersSafeAreaView>
  )
}

export default ServicesTab
