import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, StatusBar } from 'react-native'
import TaskTerriersSafeAreaView from '../Views/TaskTerriersSafeAreaView'
import { Col, Span } from '../StyleToProps'
import NavigationBar from '../components/NavigationBar'
import { UniversalButton, WarningButton } from '../components/Buttons'
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
          margin={{ top: 10 }}
        />

        <UniversalButton
          text={{ value: "This is a disabled button" }}
          size='medium'
          onPress={null}
          state='disabled'
          margin={{ top: 10 }}
        />

        <UniversalButton
          text={{ value: "This is a disabled button" }}
          size='medium'
          onPress={null}
          isProgress
          margin={{ top: 10 }}
        />
        <WarningButton
          warningStyle='fill'
          text={{ value: "This is a warning button (style :fill)" }}
          onPress={null}
          size='medium'
          margin={{ top: 10 }}
        />
        <WarningButton
          warningStyle='outline'
          text={{ value: "This is a warning button (style:outline)" }}
          onPress={null}
          size='medium'
          margin={{ top: 10 }}
        />

      </Col>

    </TaskTerriersSafeAreaView>
  )

}

export default RequestsTab
