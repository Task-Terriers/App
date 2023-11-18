import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import TaskTerriersSafeAreaView from '../../Views/TaskTerriersSafeAreaView'

interface Props { }


const AuthLoginMainScreen = () => {

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

    const renderLogo = () => {
        return (
            <Image source={require('../../assets/images/logo/TaskTerriersLogoRed.svg')} />
        )
    }

    /***********
    * render()
    ***********/

    return (
        <TaskTerriersSafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>

        </TaskTerriersSafeAreaView>
    )

}

export default AuthLoginMainScreen
