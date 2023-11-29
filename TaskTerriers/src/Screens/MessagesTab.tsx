import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import TaskTerriersSafeAreaView from '../Views/TaskTerriersSafeAreaView'
import { BUColor } from '../Libs/Colors'
import { Col } from '../StyleToProps/Col'
import { Span } from '../StyleToProps'
import NavigationBar from '../components/NavigationBar'
import { IconNames } from '../components/types'
import { MessagesCard } from '../components/Card'

interface Props {}

const MessagesTab = ({ navigation, route }) => {
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

  const profilePicture: any = require('../assets/images/profile/aleks.png')

  return (
    <TaskTerriersSafeAreaView style={{ flex: 1 }}>
      <NavigationBar iconName={IconNames['Message']} title={route.name} />
      <Col p16>
        <MessagesCard
          firstName="Anabelle"
          lastName="Brodsky"
          messagePreview="Hey, I heard you were interested in..."
          profilePicture={profilePicture}
        />
        <MessagesCard firstName="Olivia" lastName="Provonsil" messagePreview="Hi!" profilePicture={profilePicture} />
        <MessagesCard
          firstName="Alim"
          lastName="Kura"
          messagePreview="Hello, I am interested in getting a pedicure"
          profilePicture={profilePicture}
        />
        <MessagesCard firstName="Aleks" lastName="Sekulovski" messagePreview="I need help to learn how to swim" profilePicture={profilePicture} />
        <MessagesCard firstName="Youngjin" lastName="Shin" messagePreview="Hey, I would like to schedule a haircut" profilePicture={profilePicture} />
      </Col>
    </TaskTerriersSafeAreaView>
  )
}

export default MessagesTab
