import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { IconName, TypographyType } from './types'
import { Col, Row, Span } from '../StyleToProps'
import { Ionicons } from '@expo/vector-icons'
import { Divider } from './Divider'
import { UniversalColorType } from '../Libs'

interface NavigationBarProps {
  title: TypographyType.Value
  hasDivider?: boolean
  iconName?: IconName.Value
  backgroundColor?: UniversalColorType.Value
}

const NavigationBar: React.FC<NavigationBarProps> = ({ title, hasDivider, iconName, backgroundColor }) => {
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
  const getBackgroundColor = () => {
    if (backgroundColor) return backgroundColor
    return '#ffffff'
  }

  /*********
   * render
   *********/

  const renderIcon = () => {
    if (!iconName) return null
    return <Ionicons name={iconName} size={24} color="#2D2926" />
  }

  const renderTitle = () => {
    return (
      <Span titleXL ml8>
        {title.toString()}
      </Span>
    )
  }

  const getHeight = () => {
    return 54
  }

  /***********
   * render()
   ***********/

  return (
    <Row h={getHeight()} ph16 alignCenter style={{ backgroundColor: getBackgroundColor() }}>
      {renderIcon()}
      {renderTitle()}
    </Row>
  )
}

export default NavigationBar
