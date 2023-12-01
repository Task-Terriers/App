import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Col, Row, Span } from '../../StyleToProps'
import { Image } from 'expo-image'
import { TaskTerriersNavigationModule } from '../../modules/NavigationModule'
import { Root } from '../../navigation/type'

interface RequestsCardProps {
  // datasource: {} this should come from the backend.
  // will use different props for now to show example.
  firstName: string
  lastName: string
  messagePreview: string
  profilePicture: string
  onPress: () => void
}

const MessagesCard: React.FC<RequestsCardProps> = ({ firstName, lastName, messagePreview, profilePicture, onPress }) => {
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

  const renderName = () => {
    return (
      <Row>
        <Span labelL>
          {firstName} • {lastName}
        </Span>
      </Row>
    )
  }

  const renderMessagePreview = () => {
    return (
      <Row>
        <Span labelM colorNeutral70>
          {messagePreview}
        </Span>
      </Row>
    )
  }

  const renderProfilePicture = () => {
    return (
      <Col alignCenter radius100 mr10 overflow="hidden">
        <Image contentFit="fill" source={profilePicture} style={{ width: 40, height: 50 }} />
      </Col>
    )
  }

  /***********
   * render()
   ***********/

  return (
    <Col bgNeutral100 h100 radius12 p12 mb10 onPress={onPress}>
      <Row alignCenter mb10>
        {renderProfilePicture()}
        {renderName()}
      </Row>
      {renderMessagePreview()}
    </Col>
  )
}

const styles = StyleSheet.create({})

export { MessagesCard }
