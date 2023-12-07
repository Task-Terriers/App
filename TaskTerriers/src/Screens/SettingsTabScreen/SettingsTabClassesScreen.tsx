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

const SettingsTabClassesScreen = ({ navigation, route }) => {
  /*********
   * recoil
   *********/

  /**************************
   * props, navigation prams
   **************************/

  /*************
   * state, ref
   *************/

  // State for managing rendering, edit mode, classes list, and validation flags
  const [isRendering, setIsRendering] = useState<boolean>(true)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [inputText, setInputText] = useState<string>('')
  const [classes, setClasses] = useState<string[]>([])
  const [isDuplicated, setIsDuplicated] = useState<boolean>(false)
  const [isNotValid, setIsNotValid] = useState<boolean>(false)

  /**************
   * life cycles
   **************/

   // Effect hook for component mount and unmount operations
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

  // Function to navigate back to the previous screen
  const onPressReturn = () => {
    TaskTerriersNavigationModule.goBack()
  }

  // Function to handle adding a new class
  const onPressAddButton = () => {
    if (classes?.includes(inputText)) {
      setIsDuplicated(true)
      return
    }
    if (inputText.length != 9) {
      setIsNotValid(true)
      return
    }
    setInputText('')
    setClasses([...classes, inputText])
    setIsDuplicated(false)
    setIsNotValid(false)
  }

   // Function to delete a class from the list
  const onPressDelete = item => {
    const filterClasses = classes.filter(c => c !== item)
    setClasses(filterClasses)
  }

  /*********
   * render
   *********/

   // Navigation bar UI
  const renderNavBar = () => {
    return <NavigationBar title={'Classes'} iconName={IconNames['Return']} hasDivider iconAction={onPressReturn} />
  }

  // Edit/Add/Done button UI
  const renderEditButton = () => {
    return (
      <UniversalButton
        text={{ value: !isEditing ? (classes.length === 0 ? 'Add' : 'Edit') : 'Done' }}
        size="small"
        onPress={() => setIsEditing(!isEditing)}
        hasBorder
      />
    )
  }

  // Add button UI for adding a new class
  const renderAddButton = () => {
    return (
      <Col mt10 alignSelfEnd>
        <UniversalButton text={{ value: 'Add' }} size="small" onPress={onPressAddButton} hasBorder state={inputText == '' ? 'disabled' : 'enabled'} />
      </Col>
    )
  }

  // UI for each class item in the list
  const renderItem = ({ item }) => {
    return (
      <Row bgNeutral100 ph12 pv10 radius12 justifyBetween>
        <Span titleM>{item}</Span>
        <TouchableOpacity onPress={() => onPressDelete(item)}>
          {isEditing && <Ionicons name="trash-outline" color="#ff0000" size={20} />}
        </TouchableOpacity>
      </Row>
    )
  }

  // Text input for adding a new class
  const renderTextInput = () => {
    if (!isEditing) return null
    return (
      <BasicTextInput
        autoCapitalize="characters"
        autoFocus
        maxCharacter={9}
        size="small"
        placeholder={'ex: CAS CS101'}
        onChangeText={(text: string) => [setInputText(text), setIsDuplicated(false), setIsNotValid(false)]}
        value={inputText}
      />
    )
  }

  // UI to render the list of classes
  const renderClasses = () => {
    if (classes.length === 0) return null
    return (
      <Col bgNeutral100 radius12 p10>
        <FlatList data={classes} renderItem={renderItem} keyExtractor={item => item} ItemSeparatorComponent={() => <Divider />} />
      </Col>
    )
  }

  // UI for displaying warning messages for duplication or invalid input
  const renderWarningMessage = () => {
    if (isDuplicated) return <Span colorAlertCritical bodyM>{`${inputText} is already in the list.`}</Span>
    if (isNotValid) return <Span colorAlertCritical bodyM>{`${inputText} is not a valid course name.`}</Span>
  }

  /***********
   * render()
   ***********/

  return (
    <TaskTerriersSafeAreaView style={{ flex: 1 }}>
      {renderNavBar()}
      <Col p16>
        <Row justifyBetween alignCenter mb20>
          <Col opacity={isDuplicated || isNotValid ? 100 : 0}>{renderWarningMessage()}</Col>
          {renderEditButton()}
        </Row>
        {isEditing && (
          <Col bgNeutral100 p12 radius12 mb20>
            {renderTextInput()}
            {renderAddButton()}
          </Col>
        )}

        {renderClasses()}
      </Col>
    </TaskTerriersSafeAreaView>
  )
}
export default SettingsTabClassesScreen
