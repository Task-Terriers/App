import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AuthLoginMainScreen from '../Screens/Auth/AuthLoginMainScreen'
import AuthAddProfileScreen from '../Screens/Auth/AuthAddProfileScreen'

const Stack = createStackNavigator()

const AuthStack = () => {
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
      {/* <Stack.Screen name="AuthAddProfileScreen" component={AuthAddProfileScreen} /> */}
    </Stack.Navigator>
  )
}
export default AuthStack
