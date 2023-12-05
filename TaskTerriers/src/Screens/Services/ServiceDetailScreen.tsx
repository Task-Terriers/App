import React, { useState, useEffect } from 'react'

import { Image } from 'expo-image'
// import MapView from 'react-native-maps';

import NavigationBar from '../../components/NavigationBar'
import { IconNames } from '../../components/types'
import { TaskTerriersNavigationModule } from '../../modules/NavigationModule'
import TaskTerriersSafeAreaView from '../../Views/TaskTerriersSafeAreaView'
import { Col, Row, Span } from '../../StyleToProps'
import { NeutralColor } from '../../Libs'
import { Divider } from '../../components/Divider'
import { LayoutChangeEvent } from 'react-native'
import { UniversalButton } from '../../components/Buttons'
import { FloatingButton } from '../../components/Buttons/FloatingButton'
import { Ionicons, Octicons } from '@expo/vector-icons'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { FIRESTORE_DB } from '../../utilities/firebase'
import { userData } from '../../navigation'
import AsyncStorageModule from '../../modules/AsyncStorageModule'
import { Root } from '../../navigation/type'

interface ServiceDetailScreenProps {
  profilePicture?: string
  serviceName?: string
  shortServiceDescription: string
  aboutServiceProvider: string
  coursesTaken?: string[]
  major?: string
  minor?: string
  displayMajor: boolean
  firstName: string
  lastName: string
  serviceId: number
}

const ServiceDetailScreen: React.FC<ServiceDetailScreenProps> = ({
  profilePicture,
  serviceName,
  serviceId,
  shortServiceDescription,
  aboutServiceProvider,
  coursesTaken,
  major,
  minor,
  displayMajor,
  firstName,
  lastName,
}) => {
  //later, we will only get the service ID from route.params and use it to get the info using API calls.

  const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales.\n
Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit. Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula. Pellentesque rhoncus nunc et augue. Integer id felis. Curabitur aliquet pellentesque diam.`
  /**************************
   * props, navigation prams
   **************************/

  /*************
   * state, ref
   *************/

  const [isRendering, setIsRendering] = useState<boolean>(true)
  const [userInfo, setUserInfo] = useState<userData>()
  const [expanded, setExpanded] = useState<boolean>(false)
  const [buttonText, setButtonText] = useState<'Read All' | 'Close'>('Read All')

  /**************
   * life cycles
   **************/

  useEffect(() => {
    getUserInfo()
  }, [])

  /************
   * functions
   ************/

  const getUserInfo = async () => {
    const userData = await AsyncStorageModule.GET_asyncStorage('USER_DATA')
    setUserInfo(userData)
  }

  const onPressReturn = () => {
    TaskTerriersNavigationModule.goBack()
  }

  const onPressButton = () => {
    if (buttonText === 'Read All') {
      setButtonText('Close')
    } else {
      setButtonText('Read All')
    }
    setExpanded(!expanded)
  }

  const createNewChat = async () => {
    const id = `${Date.now()}`
    const chatName = `${firstName} ${lastName}`
    const _doc = {
      _id: id,
      uid: userInfo.userId,
      chatName: 'Youngjin Shin',
    }

    if (chatName !== '') {
      console.log(_doc)
      setDoc(doc(FIRESTORE_DB, 'messageRooms', id), _doc)
        .then(() => {
          TaskTerriersNavigationModule.pop()
        })
        .catch(err => {
          console.log('Error setting doc', err)
        })
    }
  }

  /*********
   * render
   *********/

  const renderNavBar = () => {
    return <NavigationBar title={'detail page'} iconName={IconNames['Return']} hasDivider iconAction={onPressReturn} />
  }

  const renderProfileSection = () => {
    return (
      <Col mb20>
        <Row>
          <Col radius100 overflowHidden>
            <Image contentFit="fill" source={require('../../assets/images/defaultProfile.jpeg')} style={{ width: 80, height: 80 }} />
          </Col>
          <Col ml10>
            <Span titleXL>Youngjin Shin</Span>
            <Span bodyL numberOfLines={1}>
              Great CS tutor
            </Span>
            <Span bodyL>Boston, MA</Span>
          </Col>
        </Row>
      </Col>
    )
  }

  //render description about the person/service
  const renderInfo = () => {
    return (
      <Col mt20>
        <Span titleXL>About</Span>
        {!expanded ? (
          <Span bodyM numberOfLines={10}>
            {loremIpsum}
          </Span>
        ) : (
          <Span bodyM>{loremIpsum}</Span>
        )}
        <Col alignEnd mt10>
          <UniversalButton size="small" text={{ value: buttonText }} onPress={onPressButton} />
        </Col>
      </Col>
    )
  }

  //needs further implementation with the maps. Need google maps api key.
  const renderLocation = () => {
    return (
      <Col mt20>
        <Span titleXL>Location</Span>
        <Span bodyL>Boston, MA</Span>

        {/* <MapView region={mapRegion} style={{ alignSelf: 'stretch', height: '100%' }} /> */}
      </Col>
    )
  }

  const renderMessageButton = () => {
    return (
      <FloatingButton
        size={'medium'}
        onPress={createNewChat}
        text={{ value: `Message ${firstName}` }}
        hasBorder
        isFullWithBtn
        icon={<Ionicons name="mail-outline" color={NeutralColor['neutral-100']} size={18} />}
      />
    )
  }

  /***********
   * render()
   ***********/
  return (
    <TaskTerriersSafeAreaView style={{ flex: 1, backgroundColor: NeutralColor['neutral-100'] }}>
      {renderNavBar()}
      <Col p16>
        {renderProfileSection()}
        <Divider />
        {renderInfo()}
        {renderLocation()}
      </Col>
      {renderMessageButton()}
    </TaskTerriersSafeAreaView>
  )
}

export default ServiceDetailScreen
