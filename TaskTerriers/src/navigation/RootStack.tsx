import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { RootStackParamList } from './type'
import NavigationBar from '../components/NavigationBar'
import { BottomTabNavigation } from './BottomTabNavigator'
import StackGroup from './StackGroup'
import AuthLoginMainScreen from '../Screens/Auth/AuthLoginMainScreen'
import AuthAddProfileScreen from '../Screens/Auth/AuthAddProfileScreen'

const Stack = createStackNavigator<RootStackParamList>()

const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
        animationTypeForReplace: 'push',
        gestureDirection: 'horizontal',
        gestureEnabled: true,
      }}>
      <Stack.Screen name="AuthLoginMainScreen" component={AuthLoginMainScreen} />
      <Stack.Screen name="BottomTabNavigation" component={BottomTabNavigation} />
      {StackGroup()}
      {/* <Stack.Screen name="AuthAddProfileScreen" component={AuthAddProfileScreen} /> */}
    </Stack.Navigator>
  )
}
export default RootStack
