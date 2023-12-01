import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native'
import TaskTerriersSafeAreaView from '../Views/TaskTerriersSafeAreaView'
import { BUColor } from '../Libs/Colors'
import { Col } from '../StyleToProps/Col'
import { Span } from '../StyleToProps'
import NavigationBar from '../components/NavigationBar'
import { IconNames } from '../components/types'
import { MessagesCard } from '../components/Card'
import { TaskTerriersNavigationModule } from '../modules/NavigationModule'
import { Root } from '../navigation/type'
import { UniversalButton } from '../components/Buttons'

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
  const profilePicture: any = require('../assets/images/profile/aleks.png')

  const mockMessagesCardData = [
    {
      firstName: 'Anabelle',
      lastName: 'Brodsky',
      messagePreview: 'Message Preview',
      profilePicture: profilePicture,
      onPress: () => onPressCard(),
    },
    {
      firstName: 'Olivia',
      lastName: 'Provonsil',
      messagePreview: 'Message Preview',
      profilePicture: profilePicture,
      onPress: () => onPressCard(),
    },
    {
      firstName: 'Alim',
      lastName: 'Kura',
      messagePreview: 'Message Preview',
      profilePicture: profilePicture,
      onPress: () => onPressCard(),
    },
    {
      firstName: 'Youngjin',
      lastName: 'Shin',
      messagePreview: 'Message Preview',
      profilePicture: profilePicture,
      onPress: () => onPressCard(),
    },
    {
      firstName: 'Aleks',
      lastName: 'Sekulovski',
      messagePreview: 'Message Preview',
      profilePicture: profilePicture,
      onPress: () => onPressCard(),
    },
  ]
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

  const onPressCard = () => {
    return TaskTerriersNavigationModule.navigate(Root.MessagesDetailScreen)
  }

  /*********
   * render
   *********/

  const renderNavigationBar = () => {
    return <NavigationBar iconName={IconNames['Message']} title={route.name} />
  }

  const renderButton = () => {
    return <UniversalButton size="medium" text={{ value: 'Go to Chats' }} onPress={onPressCard} />
  }

  const renderFlatList = () => {
    return (
      <FlatList
        data={mockMessagesCardData}
        renderItem={({ item }) => <MessagesCard {...item} />}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ padding: 16 }}
      />
    )
  }

  /***********
   * render()
   ***********/

  return (
    <TaskTerriersSafeAreaView style={{ flex: 1 }}>
      {renderNavigationBar()}
      <Col mb35>{renderFlatList()}</Col>
    </TaskTerriersSafeAreaView>
  )
}

export default MessagesTab
