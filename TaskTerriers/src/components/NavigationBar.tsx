import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { IconName, TypographyType } from './types'
import { Col, Row, Span } from '../StyleToProps'
import { Ionicons } from '@expo/vector-icons'

interface NavigationBarProps {
    title: TypographyType.Value
    hasDivider?: boolean
    iconName?: IconName.Value
}

const NavigationBar: React.FC<NavigationBarProps> = ({ title, hasDivider, iconName }) => {

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

    const renderIcon = () => {
        if (!iconName) return null
        return (
            <Ionicons name={iconName} size={24} color="#2D2926" />

        )
    }

    const renderTitle = () => {
        return (
            <Span titleXL ml8>{title.toString()}</Span>
        )
    }

    const getHeight = () => {
        return 54
    }

    /***********
    * render()
    ***********/

    return (
        <Row h={getHeight()} ph16 alignCenter>
            {renderIcon()}
            {renderTitle()}
        </Row>
    )

}


export default NavigationBar
