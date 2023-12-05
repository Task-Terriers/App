import React, { useState, useEffect } from 'react'
import { FlatList } from 'react-native'

import { DocumentData, addDoc, collection, onSnapshot } from 'firebase/firestore'

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
import { NeutralColor } from '../Libs'

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
  const [isRendering, setIsRendering] = useState<boolean>(true)
  const [userInfo, setUserInfo] = useState<userData>()
  const [groupsCollectionRef, setGroupsCollectionRef] = useState(null)
  const [groups, setGroups] = useState([])

  /**************
   * life cycles
   **************/

  useEffect(() => {
    getUserInfo()
    const ref = collection(FIRESTORE_DB, 'groups')
    setGroupsCollectionRef(ref)

    const unsubscribe = onSnapshot(ref, (groups: DocumentData) => {
      const groupData = groups.docs.map((doc) => doc.data())
      setGroups(groupData)
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

  const onPressCard = () => {
    return TaskTerriersNavigationModule.navigate(Root.MessagesDetailScreen, { chatId: 1 })
  }

  const startGroup = async () => {
    try {
      await addDoc(groupsCollectionRef, {
        name: "Group1",
        description: "This is group1",
        creator: 'YJ',
        uid: userInfo.userId,
        chatId: 1
      })
    } catch (err) {
      console.log("error creating group", err)
    }
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

  const renderItem = ({ item }) => {
    return (
      <MessagesCard
        firstName={item.name}
        lastName={item.name}
        messagePreview={item.description}
        profilePicPath={''}
        onPress={onPressCard} />
    )
  }

  const renderFlatList = () => {
    return (
      <FlatList
        data={groups}
        renderItem={renderItem}
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
      <FloatingButton
        size={'large'}
        onPress={startGroup}
        text={{ value: 'Add' }}
        hasBorder
        icon={<MaterialIcons name="add" color={NeutralColor['neutral-100']} size={18} />}
      />
    </TaskTerriersSafeAreaView>
  )
}

export default MessagesTab
