import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './type';
import AuthLoginMainScreen from '../Screens/Auth/AuthLoginMainScreen';

const Stack = createStackNavigator<RootStackParamList>()

const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animationEnabled: true,
                animationTypeForReplace: 'push',
                gestureDirection: 'horizontal',
                gestureEnabled: true
            }}>
            <Stack.Screen name="AuthLoginMainScreen" component={AuthLoginMainScreen} />
        </Stack.Navigator>
    )
}
export default AuthStack