import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { IconName, TypographyType } from './types'
import { Col, Row, Span } from '../StyleToProps'
import { Ionicons } from '@expo/vector-icons'
import { Divider } from './Divider'
import { UniversalColorType } from '../Libs'

interface PaymentBarProps {
  title: TypographyType.Value
  hasDivider?: boolean
  iconName?: IconName.Value
  iconAction?: () => void
  backgroundColor?: UniversalColorType.Value
}

const NavigationBar: React.FC<PaymentBarProps> = ({ title, hasDivider, iconName, backgroundColor, iconAction }) => {
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
    return '#cc0000'
  }
  const getHeight = () => {
    return 54
  }

  /*********
   * render
   *********/

  const renderIcon = () => {
    if (!iconName) return null
    if (iconAction) {
      return (
        <Col onPress={iconAction}>
          <Ionicons name={iconName} size={24} color="#2D2926" />
        </Col>
      )
    } else {
      return <Ionicons name={iconName} size={24} color="#2D2926" />
    }
  }

const renderTitle = () => {
    return (
        <Span titleXL ml8 style={{ flex: 1, textAlign: 'center' }}>
            {"Pay with Stripe"}
        </Span>
    )
}

  const renderDivider = () => {
    if (hasDivider) return <Divider margin={{ left: -16, right: -16 }} />
  }

  /***********
   * render()
   ***********/

  return (
    <>
      <Row h={getHeight()} ph16 alignCenter style={{ backgroundColor: getBackgroundColor() }}>
        {renderIcon()}
        {renderTitle()}
      </Row>
      {renderDivider()}
    </>
  )
}

export default NavigationBar
