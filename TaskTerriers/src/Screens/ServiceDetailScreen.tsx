import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import NavigationBar from '../components/NavigationBar'
import { IconNames } from '../components/types'
import { TaskTerriersNavigationModule } from '../navigation/NavigationModule'

interface Props { }


const ServiceDetailScreen = ({ navigation, route }) => {

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

    const onPressReturn = () => {
        TaskTerriersNavigationModule.goBack()
    }

    /*********
    * render
    *********/

    const renderNavBar = () => {
        return <NavigationBar title={'detail page'} iconName={IconNames['Return']} hasDivider iconAction={onPressReturn} />
    }

    /***********
    * render()
    ***********/

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            {renderNavBar()}
        </SafeAreaView>
    )

}

export default ServiceDetailScreen
