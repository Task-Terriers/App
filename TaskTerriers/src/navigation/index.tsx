import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Auth from '@react-native-firebase/auth'
import AsyncStorageModule from '../modules/AsyncStorageModule'
import RootStack from './RootStack'
import AuthStack from './AuthStack'
import { NavigationContainer } from '@react-navigation/native'
import { TaskTerriersNavigationRef } from '../modules/NavigationModule'

interface Props { }

const Navigation = () => {
    const { currentUser } = Auth()

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



    /*********
    * render
    *********/

    // if (isRendering === true) {
    // return null
    // }

    /***********
    * render()
    ***********/

    return (
        <NavigationContainer ref={TaskTerriersNavigationRef}>
            {currentUser ? <RootStack /> : <AuthStack />}
        </NavigationContainer>
    )

}
export default Navigation
