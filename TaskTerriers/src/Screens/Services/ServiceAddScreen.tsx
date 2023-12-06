import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import Checkbox from 'expo-checkbox'
import { Octicons } from '@expo/vector-icons'
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";

import NavigationBar from '../../components/NavigationBar'
import TaskTerriersSafeAreaView from '../../Views/TaskTerriersSafeAreaView'
import { IconNames } from '../../components/types'
import { TaskTerriersNavigationModule } from '../../modules/NavigationModule'
import { Col, Row, Span } from '../../StyleToProps'
import { BasicTextInput, } from '../../components/TextInputs'
import { BUColor, NeutralColor } from '../../Libs'
import { FloatingButton } from '../../components/Buttons/FloatingButton'
import AsyncStorageModule from '../../modules/AsyncStorageModule';
import { userData } from '../../navigation';


type servicesType = 'Education' | 'Beauty' | 'Athletics' | 'Moving' | 'Music' | 'Chores' | 'Tech' | 'Tailoring' | 'Others'

const ServiceAddScreen = ({ navigation, route }) => {
  /*********
   * recoil
   *********/

  /**************************
   * props, navigation prams
   **************************/
  const baseApiUrl = process.env.EXPO_PUBLIC_API_URL


  /*************
   * state, ref
   *************/

  const [isRendering, setIsRendering] = useState<boolean>(true)
  const [serviceNameText, setServiceNameText] = useState<string>('')
  const [shortServiceText, setShortServiceText] = useState<string>('')
  const [serviceLocation, setServiceLocation] = useState<string>('')
  const [servicePrice, setServicePrice] = useState<string>('')
  const [serviceType, setServiceType] = useState<servicesType>('Others');
  const [userInfo, setUserInfo] = useState<userData>()


  /**************
   * life cycles
   **************/

  useEffect(() => {
    getUserInfo()
    console.log(typeof `${Date.now()}`)
  }, [])

  /************
   * functions
   ************/

  const getUserInfo = async () => {
    const userData = await AsyncStorageModule.GET_asyncStorage('USER_DATA')
    setUserInfo(userData)
    console.log(userData.userId)
  }

  const onPressReturn = () => {
    TaskTerriersNavigationModule.goBack()
  }

  const POST_service = async () => {
    const body = {
      serviceId: 25,
      serviceName: serviceNameText,
      shortServiceDescription: shortServiceText,
      price: servicePrice,
      userId: userInfo?.userId,
      location: serviceLocation,
      serviceType: serviceType,
    }
    try {
      const response = await fetch(`${baseApiUrl}/api/serviceAdd`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      });
      console.log(Date.now(), serviceNameText, shortServiceText, servicePrice, userInfo?.userId, serviceLocation, serviceType)
      const result = await response.json();
      console.log(result)
    } catch (error) {
      console.error('Error post service details:', error);
    }
  };

  const onPressPostButton = async () => {
    POST_service()
    return TaskTerriersNavigationModule.goBack()
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
          keyboardType='numeric'
          size="small"
          maxCharacter={5}
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


  const renderRadioButton = () => {
    return (
      <Col>
        <Span titleM mt20 mb10>
          Service Type
        </Span>
        <RadioButtonGroup
          containerStyle={{ marginBottom: 10 }}
          selected={serviceType}
          onSelected={(value: servicesType) => setServiceType(value)}
          radioBackground={BUColor['red']}
          size={19}
          radioStyle={{ marginBottom: 10, marginRight: 8 }}

        >
          <RadioButtonItem
            value="Education"
            label={
              <Span labelL mb10>Education</Span>
            }
          />
          <RadioButtonItem
            value="Beauty"
            label={
              <Span labelL mb10>Beauty</Span>
            }
          />
          <RadioButtonItem
            value="Athletics"
            label={
              <Span labelL mb10>Athletics</Span>
            }
          />
          <RadioButtonItem
            value="Moving"
            label={
              <Span labelL mb10>Moving</Span>
            }
          />
          <RadioButtonItem
            value="Music"
            label={
              <Span labelL mb10>Music</Span>
            }
          />
          <RadioButtonItem
            value="Chores"
            label={
              <Span labelL mb10>Chores</Span>
            }
          />
          <RadioButtonItem
            value="Tech"
            label={
              <Span labelL mb10>Tech</Span>
            }
          />
          <RadioButtonItem
            value="Tailoring"
            label={
              <Span labelL mb10>Tailoring</Span>
            }
          />
          <RadioButtonItem
            value="Others"
            label={
              <Span labelL mb10>Others</Span>
            }
          />
        </RadioButtonGroup>
      </Col>

    )
  }

  const renderAddButton = () => {
    return (
      <FloatingButton
        state={!serviceNameText || !shortServiceText || !serviceLocation || !servicePrice ? 'disabled' : 'enabled'}
        size={'medium'}
        onPress={onPressPostButton}
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
          {renderRadioButton()}
          {/* {renderCheckBox()} */}
        </Col>
      </ScrollView>
      {renderAddButton()}
    </TaskTerriersSafeAreaView>
  )
}

const styles = StyleSheet.create({})

export default ServiceAddScreen
