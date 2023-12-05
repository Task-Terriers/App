import React from 'react'
import { RootStackParamList } from './type'
import 'react-native-gesture-handler'
import { createStackNavigator } from '@react-navigation/stack'
import ServiceDetailScreen from '../Screens/Services/ServiceDetailScreen'
import AuthLoginMainScreen from '../Screens/Auth/AuthLoginMainScreen'
import AuthAddProfileScreen from '../Screens/Auth/AuthAddProfileScreen'
import MessagesDetailScreen from '../Screens/MessagesDetailScreen'
import SettingsTabClassesScreen from '../Screens/SettingsTabScreen/SettingsTabClassesScreen'
import SettingsTabMajorScreen from '../Screens/SettingsTabScreen/SettingsTabMajorScreen'
import ServiceAddScreen from '../Screens/Services/ServiceAddScreen'

const Stack = createStackNavigator<RootStackParamList>()
const StackGroup = () => {
  return (
    <Stack.Group screenOptions={{ headerShown: false }}>
      {/* Services Tab */}
      <Stack.Screen name="ServiceDetailScreen" component={ServiceDetailScreen} />
      <Stack.Screen name="ServiceAddScreen" component={ServiceAddScreen} />
      <Stack.Screen name="MessagesDetailScreen" component={MessagesDetailScreen} />
      <Stack.Screen name="SettingsTabClassesScreen" component={SettingsTabClassesScreen} />
      <Stack.Screen name="SettingsTabMajorScreen" component={SettingsTabMajorScreen} />
    </Stack.Group>
  )
}

export default StackGroup
