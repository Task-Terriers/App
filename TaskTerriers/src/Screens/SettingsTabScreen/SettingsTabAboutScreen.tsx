import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import NavigationBar from '../../components/NavigationBar'
import { IconNames } from '../../components/types'
import { TaskTerriersNavigationModule } from '../../modules/NavigationModule'
import TaskTerriersSafeAreaView from '../../Views/TaskTerriersSafeAreaView'
import { FlatList } from 'react-native-gesture-handler'
import { UniversalButton } from '../../components/Buttons'
import { Col, Row, Span } from '../../StyleToProps'
import { BasicTextInput } from '../../components/TextInputs'
import { NeutralColor } from '../../Libs'
import { Divider } from '../../components/Divider'
import { Ionicons } from '@expo/vector-icons'

interface Props {}

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
  const onPressReturn = () => {
    TaskTerriersNavigationModule.goBack()
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

  const renderBioInput = () => {
    return (
      <Col mb20>
        <Span titleM mb10>
          About
        </Span>
        <BasicTextInput
          editable={isEditing}
          maxCharacter={250}
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
    </SafeAreaView>
  )
}

export default SettingsTabAboutScreen
