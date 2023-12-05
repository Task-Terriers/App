import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Col, Row, Span } from '../../StyleToProps'
import { Image } from 'expo-image'
import { TaskTerriersNavigationModule } from '../../modules/NavigationModule'
import { Root } from '../../navigation/type'
import { Ionicons } from '@expo/vector-icons'

interface RequestsCardProps {
  // datasource: {} this should come from the backend.
  // will use different props for now to show example.
  chatName: string
  messagePreview: string
  profilePicPath?: string
  onPress: () => void
}

const MessagesCard: React.FC<RequestsCardProps> = ({ chatName, messagePreview, profilePicPath, onPress }) => {
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
      <Span titleM mb2>
        {chatName}
      </Span>

    )
  }

  const renderMessagePreview = () => {
    return (
      <Span bodyL colorNeutral50 w200 numberOfLines={1}>
        {messagePreview}
      </Span>
    )
  }

  const renderProfilePicture = () => {
    return (
      <Col alignCenter radius100 mr20 overflow="hidden">
        {!profilePicPath ? (
          <Image contentFit="fill" source={require('../../assets/images/defaultProfile.jpeg')} style={{ width: 50, height: 50 }} />
        ) : (
          <Image contentFit="fill" source={profilePicPath} style={{ width: 50, height: 50 }} />
        )}
      </Col>
    )
  }

  /***********
   * render()
   ***********/

  return (
    <Col bgNeutral100 h80 radius12 p12 mb10 onPress={onPress}>
      <Row alignCenter mb10 justifyBetween>
        <Row>
          {renderProfilePicture()}
          <Col>
            {renderName()}
            {renderMessagePreview()}
          </Col>
        </Row>
        <Ionicons name='chevron-forward' size={25} />
      </Row>
    </Col>
  )
}

const styles = StyleSheet.create({})

export { MessagesCard }
