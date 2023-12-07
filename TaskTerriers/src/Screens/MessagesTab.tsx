import React, { useState, useEffect } from 'react'
import { ActivityIndicator, FlatList } from 'react-native'

// Firebase and Firestore imports for data handling
import { DocumentData, addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore'

// Custom components and styles
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
  // Sample profile picture for mock data
  const profilePicture: any = require('../assets/images/profile/aleks.png')

  // Mock data for messages, to be replaced with real data
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
  // State for managing user profile and chat data
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [userInfo, setUserInfo] = useState<userData>()
  const [chats, setChats] = useState([])

  /**************
   * life cycles
   **************/

  // Effect hook for fetching user information and setting up real-time chat updates
  useEffect(() => {
    getUserInfo()
    // Firestore query to fetch chat data
    const chatQuery = query(collection(FIRESTORE_DB, 'messageRooms'), orderBy('_id', 'desc'))

    // Subscribing to chat updates
    const unsubscribe = onSnapshot(chatQuery, querySnapShot => {
      const chatRooms = querySnapShot.docs.map(doc => doc.data())
      setChats(chatRooms)
      setIsLoading(false)
    })

    // Cleanup function to unsubscribe from the updates
    return unsubscribe
  }, [])

  /************
   * functions
   ************/

  // Function to retrieve user information from AsyncStorage
  const getUserInfo = async () => {
    const userData = await AsyncStorageModule.GET_asyncStorage('USER_DATA')
    setUserInfo(userData)
  }

  // Handler for pressing on a chat card
  const onPressCard = chatRoom => {
    return TaskTerriersNavigationModule.navigate(Root.MessagesDetailScreen, { chatRoom: chatRoom })
  }

  /*********
   * render
   *********/

  // Renders the navigation bar
  const renderNavigationBar = () => {
    return <NavigationBar iconName={IconNames['Message']} title={route.name} />
  }

  // Renders each item in the FlatList
  const renderItem = ({ item }) => {
    return <MessagesCard chatName={item?.chatName} messagePreview={'Message Preview'} profilePicPath={''} onPress={() => onPressCard(item)} />
  }

  // Renders a message when the list is empty
  const renderListEmptyComponent = () => {
    return (
      <Col alignCenter>
        <Span bodyL colorNeutral40>
          There are no messages yet.
        </Span>
      </Col>
    )
  }

  // Renders the list of messages
  const renderFlatList = () => {
    if (isLoading)
      return (
        <Col mt20>
          <ActivityIndicator size={'large'} color={BUColor['red']} />
        </Col>
      )
    return (
      <Col mb35>
        <FlatList
          ListEmptyComponent={renderListEmptyComponent}
          data={chats}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ padding: 16 }}
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
