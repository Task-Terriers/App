import React from 'react'
import { RootStackParamList } from './type'
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import ServiceDetailScreen from '../Screens/ServiceDetailScreen';


const Stack = createStackNavigator<RootStackParamList>()
const StackGroup = () => {
    return (
        <Stack.Group
            screenOptions={{ headerShown: false }}>
            {/* Services Tab */}
            <Stack.Screen name="ServiceDetailScreen" component={ServiceDetailScreen} />
        </Stack.Group>
    )
}

export default StackGroup
