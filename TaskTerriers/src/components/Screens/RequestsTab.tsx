import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, StatusBar } from 'react-native'
import TaskTerriersSafeAreaView from '../Views/TaskTerriersSafeAreaView'
import { Col, Span } from '../StyleToProps'


interface Props { }


const RequestsTab = ({ navigation, route }) => {

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
    const notchHeight = StatusBar.currentHeight?.toString()

    return (
        // <TaskTerriersSafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <Col bgAlertMinor>
            <Span> this is the RequestsTab</Span>
            <Span>{notchHeight}</Span>
        </Col>
        // </TaskTerriersSafeAreaView>
    )

}

export default RequestsTab
