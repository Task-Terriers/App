import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { IconNames } from '../../components/types'
import NavigationBar from '../../components/NavigationBar'
import { TaskTerriersNavigationModule } from '../../modules/NavigationModule'
import { BasicTextInput } from '../../components/TextInputs'
import { Col, Span } from '../../StyleToProps'
import { UniversalButton } from '../../components/Buttons'
import AsyncStorageModule from '../../modules/AsyncStorageModule'
import { userData } from '../../navigation'
import { FloatingButton } from '../../components/Buttons/FloatingButton'

interface Props {}

const SettingsTabMajorScreen = ({ navigation, route }) => {
  /*********
   * recoil
   *********/

  /**************************
   * props, navigation prams
   **************************/

  /*************
   * state, ref
   *************/

  const [isEditing, setIsEditing] = useState<boolean>(false)
  //need to set from what is from the db.
  const [majorInputText, setMajorInputText] = useState<string>('')
  const [minorInputText, setMinorInputText] = useState<string>('')
  const [userInfo, setUserInfo] = useState<userData>()
  const baseApiUrl = process.env.EXPO_PUBLIC_API_URL

  /**************
   * life cycles
   **************/

  useEffect(() => {
    getUserInfo()
  }, [])

  useEffect(() => {
    GET_user_details()
  }, [userInfo])

  /************
   * functions
   ************/
  const getUserInfo = async () => {
    const userData = await AsyncStorageModule.GET_asyncStorage('USER_DATA')
    setUserInfo(userData)
  }

  const GET_user_details = async () => {
    try {
      const response = await fetch(`${baseApiUrl}/api/userGet/${userInfo?.userId}`)
      const result = await response.json()
      console.log(result)
      setMajorInputText(result?.major)
      setMinorInputText(result?.minor)
    } catch (error) {
      console.error('Error fetching bio details:', error)
    }
  }

  const onPressReturn = () => {
    TaskTerriersNavigationModule.goBack()
  }
  const onPressDoneButton = async () => {
    try {
      const response = await fetch(`${baseApiUrl}/api/userChange/${userInfo?.userId}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        // Fields that to be updated are passed
        body: JSON.stringify({
          major: majorInputText,
          minor: minorInputText,
        }),
      })
      const result = await response.json()
      console.log(result)
    } catch (err) {
      console.log(err)
    }
  }

  /*********
   * render
   *********/

  const renderNavBar = () => {
    return <NavigationBar title={'Major/Minor'} iconName={IconNames['Return']} hasDivider iconAction={onPressReturn} />
  }

  const renderEditButton = () => {
    return <UniversalButton text={{ value: !isEditing ? 'Edit' : 'Done' }} size="small" onPress={() => setIsEditing(!isEditing)} hasBorder />
  }

  const renderMajorInput = () => {
    return (
      <Col mb20>
        <Span titleM mb10>
          Major
        </Span>
        <BasicTextInput
          editable={isEditing}
          maxCharacter={50}
          size="small"
          placeholder={'ex: Computer Science'}
          onChangeText={(text: string) => setMajorInputText(text)}
          value={majorInputText}
        />
      </Col>
    )
  }

  const renderMinorInput = () => {
    return (
      <Col>
        <Span titleM mb10>
          Minor
        </Span>
        <BasicTextInput
          editable={isEditing}
          maxCharacter={30}
          size="small"
          placeholder={'ex: Data Science'}
          onChangeText={(text: string) => setMinorInputText(text)}
          value={minorInputText}
        />
      </Col>
    )
  }
  const renderUpdateButton = () => {
    return <FloatingButton size={'medium'} onPress={onPressDoneButton} text={{ value: 'Update Major/Minor' }} hasBorder isFullWithBtn />
  }

  /***********
   * render()
   ***********/

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {renderNavBar()}
      <Col p16>
        <Col alignSelfEnd>{renderEditButton()}</Col>
        {renderMajorInput()}
        {renderMinorInput()}
      </Col>
      {renderUpdateButton()}
    </SafeAreaView>
  )
}
export default SettingsTabMajorScreen
