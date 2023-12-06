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
import { ActivityIndicator, LayoutChangeEvent, ScrollView } from 'react-native'
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

const ServiceDetailScreen = ({ navigation, route }) => {
  //later, we will only get the service ID from route.params and use it to get the info using API calls.

  const loremIpsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales.\n
Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit. Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula. Pellentesque rhoncus nunc et augue. Integer id felis. Curabitur aliquet pellentesque diam.`
  /**************************
   * props, navigation prams
   **************************/

  const serviceId = route?.params?.serviceId

  /*************
   * state, ref
   *************/

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [expanded, setExpanded] = useState<boolean>(false)
  const [buttonText, setButtonText] = useState<'Read All' | 'Close'>('Read All')
  const [serviceDetail, setServiceDetail] = useState<any>([])
  const [userInfo, setUserInfo] = useState(null)

  /**************
   * life cycles
   **************/

  useEffect(() => {
    GET_service_details()
    console.log(serviceDetail?.serviceName)
  }, [])

  useEffect(() => {
    GET_user_details()
    setIsLoading(false)
  }, [serviceDetail])

  /************
   * functions
   ************/

  const baseApiUrl = process.env.EXPO_PUBLIC_API_URL

  const GET_service_details = async () => {
    try {
      const response = await fetch(`${baseApiUrl}/api/serviceGet/${serviceId}`)
      const result = await response.json()
      setServiceDetail(result)
      console.log(result)
    } catch (error) {
      console.error('Error fetching service details:', error)
    }
  }

  const GET_user_details = async () => {
    try {
      const response = await fetch(`${baseApiUrl}/api/userGet/${serviceDetail?.userId}`)
      const result = await response.json()
      setUserInfo(result)
      console.log(result)
    } catch (error) {
      console.error('Error fetching service details:', error)
    }
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
    const chatName = `${serviceDetail?.serviceName}`
    const _doc = {
      _id: id,
      uid: userInfo?.id,
      chatName: chatName,
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
    const serviceName = serviceDetail?.serviceName
    return <NavigationBar title={serviceName} iconName={IconNames['Return']} hasDivider iconAction={onPressReturn} />
  }

  const renderProfileSection = () => {
    return (
      <Col mb20>
        <Row>
          <Col radius100 overflowHidden>
            <Image contentFit="fill" source={require('../../assets/images/defaultProfile.jpeg')} style={{ width: 80, height: 80 }} />
          </Col>
          <Col ml10>
            <Span titleXL>
              {userInfo?.firstName} {userInfo?.lastName}
            </Span>
            <Span bodyL numberOfLines={1}>
              {serviceDetail?.shortServiceDescription}
            </Span>
            <Span bodyL>{serviceDetail?.location}</Span>
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
            {userInfo?.description}
          </Span>
        ) : (
          <Span bodyM>{userInfo?.description}</Span>
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
        <Span bodyL>{serviceDetail?.location}</Span>
      </Col>
    )
  }

  const renderMessageButton = () => {
    return (
      <FloatingButton
        size={'medium'}
        onPress={createNewChat}
        text={{ value: `Message ${userInfo?.firstName} ${userInfo?.lastName}` }}
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
      <Col flex p16>
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
