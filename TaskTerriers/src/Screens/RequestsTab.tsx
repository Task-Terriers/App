import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, StatusBar } from 'react-native'
import TaskTerriersSafeAreaView from '../Views/TaskTerriersSafeAreaView'
import { Col, Span } from '../StyleToProps'
import NavigationBar from '../components/NavigationBar'
import { UniversalButton } from '../components/Buttons'
import { NeutralColor } from '../Libs'

interface Props { }

const RequestsTab = ({ navigation, route }) => {
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

  // if (isRendering === true) {
  // return null
  // }

  /***********
  * render()
  ***********/

  return (
    <TaskTerriersSafeAreaView style={{ flex: 1, backgroundColor: NeutralColor['neutral-90'] }}>
      <NavigationBar iconName='help-buoy' title="Requests" />
      <Col ph16>
        <Col bgAlertMinor>
          <Span> this is the RequestsTab</Span>
        </Col>
        <UniversalButton
          text={{ value: "Click me", color: NeutralColor['neutral-0'] }}
          size='medium'
          onPress={null}
        ></UniversalButton>

        <UniversalButton
          text={{ value: "This is a disabled button" }}
          size='medium'
          onPress={null}
          state='disabled'
        ></UniversalButton>

        <UniversalButton
          text={{ value: "This is a disabled button" }}
          size='medium'
          onPress={null}
          isProgress
        ></UniversalButton>
      </Col>

    </TaskTerriersSafeAreaView>
  )

  return (
    <TaskTerriersSafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <NavigationBar iconName="help-buoy" title="Requests" />
      <Col bgAlertMinor>
        <Span> this is the RequestsTab</Span>
      </Col>
    </TaskTerriersSafeAreaView>
  )
}

export default RequestsTab
