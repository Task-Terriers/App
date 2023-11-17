import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Row, Span } from '../../StyleToProps'

interface RequestsCardProps {
  // datasource: {} this should come from the backend.
  // will use different props for now to show example.
  firstName: string
  lastName: string
  date: Date
  numberOfComments?: number
  postPreview?: string
  hideKebabMenu?: boolean
}

const SerivcesCard: React.FC<RequestsCardProps> = ({ firstName, lastName, date, numberOfComments, postPreview, hideKebabMenu }) => {
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
    ; <Row>
      <Span labelL>
        {firstName} • {lastName}
      </Span>
    </Row>
  }

  const renderDate = () => {
    ; <Row>
      <Span labelM colorNeutral70>
        {date.getDate()}
      </Span>
    </Row>
  }

  /***********
   * render()
   ***********/

  return <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}></SafeAreaView>
}

const styles = StyleSheet.create({})

export { SerivcesCard }
