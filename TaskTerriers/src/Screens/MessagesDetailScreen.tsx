import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, ListRenderItemInfo } from 'react-native'
import NavigationBar from '../components/NavigationBar'
import { IconNames } from '../components/types'
import { TaskTerriersNavigationModule } from '../modules/NavigationModule'
import TaskTerriersSafeAreaView from '../Views/TaskTerriersSafeAreaView'
import { DocumentData, addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { FIRESTORE_DB } from '../utilities/firebase'
import AsyncStorageModule from '../modules/AsyncStorageModule'
import { userData } from '../navigation'
import { Col, Row, Span } from '../StyleToProps'
import { BUColor, NeutralColor } from '../Libs'
import { BasicTextInput, TextInputWithHeightChange } from '../components/TextInputs'
import { UniversalButton } from '../components/Buttons'
import { Ionicons, Octicons } from '@expo/vector-icons'
import { FlatList } from 'react-native-gesture-handler'
import { deviceInfo } from '../utilities/deviceInfo'

interface Props { }

const MessagesDetailScreen = ({ navigation, route }) => {

  /*********
   * recoil
   *********/

  /**************************
   * props, navigation prams
   **************************/

  const { chatRoom } = route?.params

  /*************
   * state, ref
   *************/

  const [isRendering, setIsRendering] = useState<boolean>(true)
  const [userInfo, setUserInfo] = useState<userData>()
  const [messages, setMessages] = useState([])
  const [messageText, setMessageText] = useState<string>('')

  /**************
   * life cycles
   **************/

  useEffect(() => {
    getUserInfo()

    const messagesQuery = query(
      collection(FIRESTORE_DB, "messageRooms", chatRoom?._id, 'messages'),
      orderBy("createdAt", "asc")
    )

    const unsubscribe = onSnapshot(messagesQuery, (querySnapShot) => {
      const messages = querySnapShot.docs.map((doc) => doc.data())
      setMessages(messages)
    })
    return unsubscribe


  }, [])

  /*************
  * life cycles
  *************/

  useEffect(() => {
    console.log(messages)
  }, [messages])

  /************
   * functions
   ************/

  const getUserInfo = async () => {
    const userData = await AsyncStorageModule.GET_asyncStorage('USER_DATA')
    setUserInfo(userData)
    console.log(userData.userId)

  }

  const sendMessage = async () => {
    const msg = messageText.trim()
    if (!msg) return

    const id = `${Date.now()}`
    const _doc = {
      _id: id,
      room_id: chatRoom._id,
      message: msg,
      sender: userInfo.userId,
      createdAt: serverTimestamp()
    }
    setMessageText('')
    try {
      await addDoc(collection(doc(FIRESTORE_DB, 'messageRooms', chatRoom?._id), 'messages'), _doc)
    } catch (err) {
      console.log(err)
    }
  }
  const onPressReturn = () => {
    TaskTerriersNavigationModule.goBack()
  }


  /*********
   * render
   *********/

  const renderNavBar = () => {
    return <NavigationBar title={chatRoom?.chatName} iconName={IconNames['Return']} hasDivider iconAction={onPressReturn} />
  }

  const renderSendBox = () => {
    return (
      <Row alignCenter borderColor={BUColor['black']} borderTW1 ph10 radius12 pv8>
        <Col flex>
          <TextInputWithHeightChange
            initialHeight={40}
            size="small"
            placeholder={'Message'}
            onChangeText={(text: string) => setMessageText(text)}
            value={messageText}
            multiline
          />
        </Col>
        <TouchableOpacity
          disabled={!messageText}
          onPress={sendMessage}>
          <Col ml10 style={{ transform: [{ rotate: '-40deg' }] }}>
            <Octicons name='paper-airplane' size={24} color={!messageText ? NeutralColor['neutral-50'] : BUColor['black']} />
          </Col>
        </TouchableOpacity>
      </Row>
    )
  }
  const renderMyMessageBubble = ({ item }: { item: DocumentData }) => {
    return (
      <Col bgBURed radiusBL12 radiusBR12 radiusTL12 p12 maxW={deviceInfo.size.width / 2 + 30} flexShrink alignSelfEnd>
        <Span bodyL colorNeutral100>{item?.message}</Span>
      </Col>
    )

  }

  const renderOtherMessageBubble = ({ item }: { item: DocumentData }) => {
    return (
      <Col bgNeutral100 radiusBL12 radiusBR12 radiusTR12 p12 maxW={deviceInfo.size.width / 2 + 30} flexShrink alignSelfStart>
        <Span bodyL>{item?.message}</Span>
      </Col>
    )

  }

  const renderFlatList = () => {
    return (
      <FlatList
        data={messages}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => item?.sender === userInfo.userId.toString() ? renderMyMessageBubble({ item }) : renderOtherMessageBubble({ item })}
        ItemSeparatorComponent={() => <Col mb20></Col>}
      />
    )

  }

  /***********
   * render()
   ***********/

  return (
    <TaskTerriersSafeAreaView style={{ flex: 1 }}>
      {renderNavBar()}
      <Col p16 flex>
        {renderFlatList()}
        {/* {renderMyMessageBubble('afjdlasjfkdjs;kafjkdsjafkdjkfj;dlsajf;kj;dsk;afjkdsjfkjdskajfkldsjfkdsj;afjdkafjd;kjsa;fkldjsafj;djafkdjsafkdjslkfj;lj')}
        {renderOtherMessageBubble('afjdlasjfkdjs;kafjkdsjafkdjkfj;dlsajf;kj;dsk;afjkdsjfkjdskajfkldsjfkdsj;afjdkafjd;kjsa;fkldjsafj;djafkdjsafkdjslkfj;lj')} */}
      </Col>
      {renderSendBox()}
    </TaskTerriersSafeAreaView>
  )
}

export default MessagesDetailScreen




