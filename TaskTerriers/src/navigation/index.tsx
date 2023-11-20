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

        if (currentUser) {
            const userData = {
                firstName: parseName().firstName,
                lastName: parseName().lastName,
                email: currentUser.email,
                photoURL: currentUser.photoURL,
            }
            AsyncStorageModule.SET_asyncStorage('USER_DATA', JSON.stringify(userData))
        }

    }, [])

    /************
    * functions
    ************/

    const parseName = () => {
        if (currentUser) {
            const displayName = currentUser?.displayName.split(' ')
            return { firstName: displayName[0], lastName: displayName[1] }
        }
    }



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
