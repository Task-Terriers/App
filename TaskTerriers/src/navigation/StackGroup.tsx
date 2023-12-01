import React from 'react'
import { RootStackParamList } from './type'
import 'react-native-gesture-handler'
import { createStackNavigator } from '@react-navigation/stack'
import ServiceDetailScreen from '../Screens/ServiceDetailScreen'
import AuthLoginMainScreen from '../Screens/Auth/AuthLoginMainScreen'
import AuthAddProfileScreen from '../Screens/Auth/AuthAddProfileScreen'
import MessagesDetailScreen from '../Screens/MessagesDetailScreen'

const Stack = createStackNavigator<RootStackParamList>()
const StackGroup = () => {
  return (
    <Stack.Group screenOptions={{ headerShown: false }}>
      {/* Services Tab */}
      <Stack.Screen name="ServiceDetailScreen" component={ServiceDetailScreen} />
      <Stack.Screen name="MessagesDetailScreen" component={MessagesDetailScreen} />
    </Stack.Group>
  )
}

export default StackGroup
