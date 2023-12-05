import React, { useState, useEffect } from 'react'
import { ActivityIndicator, FlatList } from 'react-native'

import { DocumentData, addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore'

import TaskTerriersSafeAreaView from '../Views/TaskTerriersSafeAreaView'
import { Col } from '../StyleToProps/Col'
import NavigationBar from '../components/NavigationBar'
import { IconNames } from '../components/types'
import { MessagesCard } from '../components/Card'
import { TaskTerriersNavigationModule } from '../modules/NavigationModule'
import { Root } from '../navigation/type'
import { UniversalButton } from '../components/Buttons'
import { firebase } from '@react-native-firebase/auth'
import { FIRESTORE_DB } from '../utilities/firebase'
import AsyncStorageModule from '../modules/AsyncStorageModule'
import { userData } from '../navigation'
import { FloatingButton } from '../components/Buttons/FloatingButton'
import { MaterialIcons } from '@expo/vector-icons'
import { BUColor, NeutralColor } from '../Libs'
import { Span } from '../StyleToProps'

interface Props { }

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
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [userInfo, setUserInfo] = useState<userData>()
  const [chats, setChats] = useState([])

  /**************
   * life cycles
   **************/

  useEffect(() => {
    getUserInfo()
    const chatQuery = query(collection(FIRESTORE_DB, "messageRooms"), orderBy("_id", "desc"))

    const unsubscribe = onSnapshot(chatQuery, (querySnapShot) => {
      const chatRooms = querySnapShot.docs.map((doc) => doc.data())
      setChats(chatRooms)
      setIsLoading(false)
    })

    return unsubscribe
  }, [])

  /************
   * functions
   ************/

  const getUserInfo = async () => {
    const userData = await AsyncStorageModule.GET_asyncStorage('USER_DATA')
    setUserInfo(userData)

  }

  const onPressCard = (chatRoom) => {
    return TaskTerriersNavigationModule.navigate(Root.MessagesDetailScreen, { chatRoom: chatRoom })
  }


  /*********
   * render
   *********/

  const renderNavigationBar = () => {
    return <NavigationBar iconName={IconNames['Message']} title={route.name} />
  }
  const renderItem = ({ item }) => {
    return (
      <MessagesCard
        chatName={item?.chatName}
        messagePreview={'previewwwwwwwwdfla;dfdlfsdjklfdjsl'}
        profilePicPath={''}
        onPress={() => onPressCard(item)} />
    )
  }
  const renderListEmptyComponent = () => {
    return (
      <Col alignCenter>
        <Span bodyL colorNeutral40>There are no messages yet.</Span>
      </Col>
    )

  }

  const renderFlatList = () => {
    if (isLoading) return <Col mt20><ActivityIndicator size={'large'} color={BUColor['red']} /></Col>
    return (
      <Col mb35>
        <FlatList
          ListEmptyComponent={renderListEmptyComponent}
          data={chats}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ padding: 16, }}
        />
      </Col>
    )
  }

  /***********
   * render()
   ***********/

  return (
    <TaskTerriersSafeAreaView style={{ flex: 1 }}>
      {renderNavigationBar()}
      {renderFlatList()}
    </TaskTerriersSafeAreaView>
  )
}

export default MessagesTab
