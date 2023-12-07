import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import TaskTerriersSafeAreaView from '../../Views/TaskTerriersSafeAreaView'
import { Col } from '../../StyleToProps/Col'
import { Span } from '../../StyleToProps'
import NavigationBar from '../../components/NavigationBar'
import { IconNames } from '../../components/types'
import { UniversalButton } from '../../components/Buttons'
import { TaskTerriersNavigationModule } from '../../modules/NavigationModule'
import { Root } from '../../navigation/type'
import AsyncStorageModule from '../../modules/AsyncStorageModule'
import { SerivcesCard } from '../../components/Card'
import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs'
import { FloatingButton } from '../../components/Buttons/FloatingButton'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { NeutralColor } from '../../Libs'
import ServiceAddScreen from './ServiceAddScreen'

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

  const [isRendering, setIsRendering] = useState<boolean>(true)
  const [services, setServices] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  // Base URL for API calls
  const baseApiUrl = process.env.EXPO_PUBLIC_API_URL

  // Function to fetch services from the API
  const GET_services = async () => {
    try {
      const response = await fetch(`${baseApiUrl}/api/serviceList`)
      const result = await response.json()
      setServices(result)
      console.log(result)
    } catch (error) {
      console.error('Error fetching service user details:', error)
    }
  }

  /**************
   * life cycles
   **************/

  // Effect hook for fetching services on component mount
  useEffect(() => {
    console.log(GET_services())
  }, [])

  /************
   * functions
   ************/

  // Function to handle card press
  const onPressCard = item => {
    console.log(item)
    return TaskTerriersNavigationModule.navigate(Root.ServiceDetailScreen, { serviceId: item?.serviceId })
  }

  // Function to handle adding a new service
  const onPressFloatingButton = async () => {
    return TaskTerriersNavigationModule.navigate(Root.ServiceAddScreen)
  }

  // Function to handle refresh action
  const _onRefresh = async () => {
    setRefreshing(true)
    GET_services()
    setRefreshing(false)
  }

  /*********
   * render
   *********/

  // Render the navigation bar
  const renderNavigationBar = () => {
    return <NavigationBar iconName={IconNames['Service']} title={route.name} />
  }

  // Render the floating add button
  const renderFloatingButton = () => {
    return (
      <FloatingButton
        size={'large'}
        onPress={onPressFloatingButton}
        text={{ value: 'Add' }}
        hasBorder
        icon={<MaterialIcons name="add" color={NeutralColor['neutral-100']} size={18} />}
      />
    )
  }

  // Render each service card
  const renderItem = ({ item }) => {
    return (
      <SerivcesCard
        serviceName={item?.serviceName}
        firstName={item?.firstName}
        lastName={item?.lastName}
        major={item?.major}
        serviceRate={item?.price}
        postPreview={item?.description}
        serviceType={item?.serviceType}
        onPress={() => onPressCard(item)}
      />
    )
  }

  // Render UI when there are no services
  const renderListEmptyComponent = () => {
    return (
      <Col alignCenter>
        <Span bodyL colorNeutral40>
          There are no services yet.
        </Span>
      </Col>
    )
  }

  /***********
   * render()
   ***********/

  return (
    <TaskTerriersSafeAreaView style={{ flex: 1 }}>
      {renderNavigationBar()}
      <Col mb35>
        <FlatList
          data={services}
          ListEmptyComponent={renderListEmptyComponent}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ padding: 16 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={_onRefresh} tintColor={NeutralColor['neutral-40']} />}
        />
      </Col>
      {renderFloatingButton()}
    </TaskTerriersSafeAreaView>
  )
}

export default ServicesTab
