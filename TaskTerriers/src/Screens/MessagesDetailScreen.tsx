import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import NavigationBar from '../components/NavigationBar'
import { IconNames } from '../components/types'
import { TaskTerriersNavigationModule } from '../modules/NavigationModule'
import TaskTerriersSafeAreaView from '../Views/TaskTerriersSafeAreaView'
import { DocumentData, addDoc, collection, onSnapshot, serverTimestamp } from 'firebase/firestore'
import { FIRESTORE_DB } from '../utilities/firebase'
import AsyncStorageModule from '../modules/AsyncStorageModule'
import { userData } from '../navigation'
import { Col, Row, Span } from '../StyleToProps'
import { BUColor, NeutralColor } from '../Libs'
import { BasicTextInput, TextInputWithHeightChange } from '../components/TextInputs'
import { UniversalButton } from '../components/Buttons'
import { Ionicons } from '@expo/vector-icons'

interface Props { }

const MessagesDetailScreen = ({ navigation, route }) => {

  /*********
   * recoil
   *********/

  /**************************
   * props, navigation prams
   **************************/

  const { chatId } = route?.params?.chatId

  /*************
   * state, ref
   *************/

  const [isRendering, setIsRendering] = useState<boolean>(true)
  const [userInfo, setUserInfo] = useState<userData>()
  const [messages, setMessages] = useState()
  const [messageText, setMessageText] = useState<string>('')

  /**************
   * life cycles
   **************/

  useEffect(() => {
    getUserInfo()
    const messageCollectionRef = collection(FIRESTORE_DB, `groups/${chatId}/messages`)

    const unsubscribe = onSnapshot(messageCollectionRef, (groups: DocumentData) => {
      const messages = groups.docs.map((doc) => doc.data())
      setMessages(messages)
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

  const sendMessage = async () => {
    const msg = messageText.trim()
    if (!msg) return

    const messageCollectionRef = collection(FIRESTORE_DB, `groups/${chatId}/messages`)

    addDoc(messageCollectionRef, {
      message: msg,
      sender: userInfo.userId,
      createdAt: serverTimestamp
    })

  }
  const onPressReturn = () => {
    TaskTerriersNavigationModule.goBack()
  }


  /*********
   * render
   *********/

  const renderNavBar = () => {
    return <NavigationBar title={'Chat'} iconName={IconNames['Return']} hasDivider iconAction={onPressReturn} />
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
        <Col flexShrink ml10>
          <UniversalButton size='small' text={{ value: 'Send', color: NeutralColor['neutral-100'] }} onPress={sendMessage} hasBorder backgroundColor={BUColor['red']} />
        </Col>

      </Row>
    )
  }
  const renderMyMessageBubble = (message: string) => {
    return (
      <Col bgBURed radiusBL12 radiusBR12 radiusTL12 p12>
        <Span bodyM>{message}</Span>
      </Col>
    )

  }

  const renderOtherMessageBubble = (message: string) => {
    return (
      <Col bgNeutral100 radiusBL12 radiusBR12 radiusTR12 p12>
        <Span bodyM >{message}</Span>
      </Col>
    )

  }

  /***********
   * render()
   ***********/

  return (
    <TaskTerriersSafeAreaView style={{ flex: 1 }}>
      {renderNavBar()}
      <Col p16 flex>
        {renderMyMessageBubble('afjdlasjfkdjs;kafjkdsjafkdjkfj;dlsajf;kj;dsk;afjkdsjfkjdskajfkldsjfkdsj;afjdkafjd;kjsa;fkldjsafj;djafkdjsafkdjslkfj;lj')}
        {renderOtherMessageBubble('afjdlasjfkdjs;kafjkdsjafkdjkfj;dlsajf;kj;dsk;afjkdsjfkjdskajfkldsjfkdsj;afjdkafjd;kjsa;fkldjsafj;djafkdjsafkdjslkfj;lj')}
      </Col>
      {renderSendBox()}
    </TaskTerriersSafeAreaView>
  )
}

export default MessagesDetailScreen




