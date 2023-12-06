import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import Checkbox from 'expo-checkbox'

import NavigationBar from '../../components/NavigationBar'
import TaskTerriersSafeAreaView from '../../Views/TaskTerriersSafeAreaView'
import { IconNames } from '../../components/types'
import { TaskTerriersNavigationModule } from '../../modules/NavigationModule'
import { Col, Row, Span } from '../../StyleToProps'
import { BasicTextInput, TextInputWithHeightChange } from '../../components/TextInputs'
import { BUColor, NeutralColor } from '../../Libs'
import { UniversalButton } from '../../components/Buttons'
import { FloatingButton } from '../../components/Buttons/FloatingButton'
import { Octicons } from '@expo/vector-icons'

interface Props {}

const ServiceAddScreen = ({ navigation, route }) => {
  /*********
   * recoil
   *********/

  /**************************
   * props, navigation prams
   **************************/

  /*************
   * state, ref
   *************/

  const [isRendering, setIsRendering] = useState<boolean>(true)
  const [serviceNameText, setServiceNameText] = useState<string>('')
  const [shortServiceText, setShortServiceText] = useState<string>('')
  const [aboutText, setAboutText] = useState<string>('')
  const [serviceLocation, setServiceLocation] = useState<string>('')
  const [servicePrice, setServicePrice] = useState<string>('')
  const [isChecked, setIsChecked] = useState<boolean>(false)

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
    return <NavigationBar title={'Add New Service'} iconName={IconNames['Return']} hasDivider iconAction={onPressReturn} />
  }

  const renderInputs = () => {
    return (
      <Col>
        <Span titleM mb10>
          Service Name
        </Span>
        <BasicTextInput
          autoFocus
          maxCharacter={20}
          size="small"
          placeholder={'ex: CS112 tutoring'}
          onChangeText={(text: string) => setServiceNameText(text)}
          value={serviceNameText}
        />
        <Span titleM mt20 mb10>
          Short Service Description
        </Span>
        <BasicTextInput
          size="small"
          maxCharacter={30}
          placeholder={'ex: Best Tutor Ever'}
          onChangeText={(text: string) => setShortServiceText(text)}
          value={shortServiceText}
        />
        <Span titleM mt20 mb10>
          Price
        </Span>
        <BasicTextInput
          size="small"
          maxCharacter={10}
          placeholder={'ex: 20'}
          onChangeText={(text: string) => setServicePrice(text)}
          value={servicePrice}
        />
        <Span titleM mt20 mb10>
          Service Location
        </Span>
        <BasicTextInput
          size="small"
          maxCharacter={10}
          placeholder={'ex: Boston, MA'}
          onChangeText={(text: string) => setServiceLocation(text)}
          value={serviceLocation}
        />
      </Col>
    )
  }

  const renderCheckBox = () => {
    return (
      <Row mt20 alignCenter>
        <Span titleM mr8>
          Display Major
        </Span>
        <Checkbox value={isChecked} onValueChange={setIsChecked} color={isChecked ? BUColor['red'] : NeutralColor['neutral-70']} />
      </Row>
    )
  }

  const renderAddButton = () => {
    return (
      <FloatingButton
        state={!serviceNameText || !shortServiceText || !serviceLocation || !aboutText ? 'disabled' : 'enabled'}
        size={'medium'}
        onPress={null}
        text={{ value: 'Post Service' }}
        hasBorder
        isFullWithBtn
        icon={<Octicons name="paper-airplane" color={NeutralColor['neutral-100']} size={18} />}
      />
    )
  }

  /***********
   * render()
   ***********/

  return (
    <TaskTerriersSafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {renderNavBar()}
      <ScrollView>
        <Col p16 mb80>
          {renderInputs()}
          {renderCheckBox()}
        </Col>
      </ScrollView>
      {renderAddButton()}
    </TaskTerriersSafeAreaView>
  )
}

const styles = StyleSheet.create({})

export default ServiceAddScreen
