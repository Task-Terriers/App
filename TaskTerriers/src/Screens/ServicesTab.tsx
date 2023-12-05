import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native'
import TaskTerriersSafeAreaView from '../Views/TaskTerriersSafeAreaView'
import { Col } from '../StyleToProps/Col'
import { Span } from '../StyleToProps'
import NavigationBar from '../components/NavigationBar'
import { IconNames } from '../components/types'
import { UniversalButton } from '../components/Buttons'
import { TaskTerriersNavigationModule } from '../modules/NavigationModule'
import { Root } from '../navigation/type'
import AsyncStorageModule from '../modules/AsyncStorageModule'
import { SerivcesCard } from '../components/Card'
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs'
import { FloatingButton } from '../components/Buttons/FloatingButton'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { NeutralColor } from '../Libs'

interface Props {}

const ServicesTab = ({ route }) => {
  /*********
   * recoil
   *********/

  /**************************
   * props, navigation prams
   **************************/

  /*************
   * state, ref
   *************/

  const mockRequestsCardData = [
    {
      firstName: 'John',
      lastName: 'Doe',
      postPreview: 'Exploring Microbiology',
      hideKebabMenu: false,
      profilePicPath: 'https://picsum.photos/seed/696/3000/2000',
      major: 'Biology',
      numOfReview: 12,
      reviewRate: 4.7,
      serviceRate: 150,
      onPress: () => onPressCard(),
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      postPreview: 'Art in the Renaissance',
      hideKebabMenu: true,
      profilePicPath: 'https://picsum.photos/200/300?grayscale',
      major: 'Art History',
      numOfReview: 8,
      reviewRate: 4.3,
      serviceRate: 120,
      onPress: () => onPressCard(),
    },
    {
      firstName: 'Alice',
      lastName: 'Johnson',
      postPreview: 'The Basics of Quantum Physics',
      hideKebabMenu: false,
      profilePicPath: 'https://picsum.photos/200/300/?blur',
      major: 'Physics',
      numOfReview: 15,
      reviewRate: 4.9,
      serviceRate: 200,
      onPress: () => onPressCard(),
    },
    {
      firstName: 'Bob',
      lastName: 'Brown',
      postPreview: 'Modern Architecture and Design',
      hideKebabMenu: true,
      profilePicPath: 'https://picsum.photos/seed/706/3000/2000',
      major: 'Architecture',
      numOfReview: 5,
      reviewRate: 4.0,
      serviceRate: 95,
      onPress: () => onPressCard(),
    },
    {
      firstName: 'Carol',
      lastName: 'Davis',
      postPreview: 'Exploring World History',
      hideKebabMenu: false,
      profilePicPath: 'https://picsum.photos/seed/106/3000/2000',
      major: 'History',
      numOfReview: 20,
      reviewRate: 4.8,
      serviceRate: 180,
      onPress: () => onPressCard(),
    },
    {
      firstName: 'David',
      lastName: 'Miller',
      postPreview: 'Introduction to Computer Science',
      hideKebabMenu: true,
      profilePicPath: 'https://picsum.photos/seed/640/3000/2000',
      major: 'Computer Science',
      numOfReview: 10,
      reviewRate: 4.2,
      serviceRate: 110,
      onPress: () => onPressCard(),
    },
    {
      firstName: 'Eva',
      lastName: 'Wilson',
      postPreview: 'Theories of Economics',
      hideKebabMenu: false,
      profilePicPath: 'https://picsum.photos/seed/576/3000/2000',
      major: 'Economics',
      numOfReview: 7,
      reviewRate: 4.1,
      serviceRate: 100,
      onPress: () => onPressCard(),
    },
    {
      firstName: 'Frank',
      lastName: 'Anderson',
      postPreview: 'Understanding Chemical Reactions',
      hideKebabMenu: true,
      major: 'Chemistry',
      numOfReview: 13,
      reviewRate: 4.6,
      serviceRate: 140,
      onPress: () => onPressCard(),
    },
    {
      firstName: 'Grace',
      lastName: 'Thomas',
      postPreview: 'Advanced Mathematics for Engineers',
      hideKebabMenu: false,
      major: 'Engineering',
      numOfReview: 9,
      reviewRate: 4.4,
      serviceRate: 130,
      onPress: () => onPressCard(),
    },
    {
      firstName: 'Henry',
      lastName: 'Jackson',
      postPreview: 'Political Science and Modern Governance',
      hideKebabMenu: true,
      profilePicPath: 'https://picsum.photos/seed/400/3000/2000',
      major: 'Political Science',
      numOfReview: 11,
      reviewRate: 4.5,
      serviceRate: 125,
      onPress: () => onPressCard(),
    },
  ]

  const [isRendering, setIsRendering] = useState<boolean>(true)

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

  const onPressCard = () => {
    return TaskTerriersNavigationModule.navigate(Root.ServiceDetailScreen)
  }
  const onPressToAddProfile = async () => {
    const userData = await AsyncStorageModule.GET_asyncStorage('USER_DATA')
    return TaskTerriersNavigationModule.navigate('AuthAddProfileScreen', JSON.parse(userData))
  }

  /*********
   * render
   *********/

  const renderNavigationBar = () => {
    return <NavigationBar iconName={IconNames['Service']} title={route.name} />
  }

  const renderButton = () => {
    return <UniversalButton size="medium" text={{ value: 'Go to Detail Screen' }} onPress={onPressCard} />
  }

  /***********
   * render()
   ***********/

  return (
    <TaskTerriersSafeAreaView style={{ flex: 1 }}>
      {renderNavigationBar()}
      <Col mb35>
        <FlatList
          data={mockRequestsCardData}
          renderItem={({ item }) => <SerivcesCard {...item} />}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ padding: 16 }}
        />
      </Col>
      <FloatingButton
        size={'large'}
        onPress={null}
        text={{ value: 'Add' }}
        hasBorder
        icon={<MaterialIcons name="add" color={NeutralColor['neutral-100']} size={18} />}
      />
    </TaskTerriersSafeAreaView>
  )
}

export default ServicesTab
