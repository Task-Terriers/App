import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import NavigationBar from '../../components/NavigationBar'
import { IconNames } from '../../components/types'
import { TaskTerriersNavigationModule } from '../../modules/NavigationModule'
import TaskTerriersSafeAreaView from '../../Views/TaskTerriersSafeAreaView'
import { FlatList } from 'react-native-gesture-handler'
import { UniversalButton } from '../../components/Buttons'
import { Col, Row, Span } from '../../StyleToProps'
import { BasicTextInput, TextInputWithHeightChange } from '../../components/TextInputs'
import { NeutralColor } from '../../Libs'
import { Divider } from '../../components/Divider'
import { Ionicons } from '@expo/vector-icons'
import { userData } from '../../navigation'
import AsyncStorageModule from '../../modules/AsyncStorageModule'
import { FloatingButton } from '../../components/Buttons/FloatingButton'

interface Props { }

const SettingsTabAboutScreen = ({ navigation, route }) => {
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
  const [bioInputText, setBioInputText] = useState<string>('')
  const [userInfo, setUserInfo] = useState<userData>()
  const baseApiUrl = process.env.EXPO_PUBLIC_API_URL


  /**************
   * life cycles
   **************/

  useEffect(() => {
    getUserInfo()

  }, [])

  /*************
  * life cycles
  *************/

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
      const response = await fetch(`${baseApiUrl}/api/userGet/${userInfo?.userId}`);
      const result = await response.json();
      console.log(result)
      setBioInputText(result?.description)

    } catch (error) {
      console.error('Error fetching bio details:', error);
    }
  };

  const onPressReturn = () => {
    TaskTerriersNavigationModule.goBack()
  }

  const onPressDoneButton = async () => {
    try {
      const response = await fetch(`${baseApiUrl}/api/userChange/${userInfo?.userId}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        // Fields that to be updated are passed
        body: JSON.stringify({
          description: bioInputText
        })
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
    return <NavigationBar title={'Bio'} iconName={IconNames['Return']} hasDivider iconAction={onPressReturn} />
  }

  const renderEditButton = () => {
    return <UniversalButton text={{ value: !isEditing ? 'Edit' : 'Done' }} size="small" onPress={() => setIsEditing(!isEditing)} hasBorder />
  }

  const renderUpdateButton = () => {
    return (
      <FloatingButton
        size={'medium'}
        onPress={onPressDoneButton}
        text={{ value: 'Update Bio' }}
        hasBorder
        isFullWithBtn
      />
    )
  }



  const renderBioInput = () => {
    return (
      <Col mb20>
        <Span titleM mb10>
          About
        </Span>
        <TextInputWithHeightChange
          editable={isEditing}
          multiline
          size="small"
          placeholder={'Tell us about yourself!'}
          onChangeText={(text: string) => setBioInputText(text)}
          value={bioInputText}
        />
      </Col>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {renderNavBar()}
      <Col p16>
        <Col alignSelfEnd>{renderEditButton()}</Col>
        {renderBioInput()}
      </Col>
      {renderUpdateButton()}
    </SafeAreaView>
  )
}

export default SettingsTabAboutScreen
