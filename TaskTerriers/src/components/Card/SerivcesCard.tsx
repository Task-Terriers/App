import React, { useState, useEffect } from 'react'
import { Col, Row, Span } from '../../StyleToProps'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'

interface RequestsCardProps {
  // datasource: {} this should come from the backend.
  // will use different props for now to show example.
  firstName: string
  lastName: string
  serviceName: string
  postPreview?: string
  hideKebabMenu?: boolean
  profilePicPath?: string
  major: string
  reviewRate: number
  serviceRate: number
  onPress?: () => void
}

const SerivcesCard: React.FC<RequestsCardProps> = ({
  firstName,
  lastName,
  serviceName,
  postPreview,
  hideKebabMenu,
  profilePicPath,
  major,
  reviewRate,
  serviceRate,
  onPress,
}) => {
  /**************************
   * props, navigation prams
   **************************/

  /*************
   * state, ref
   *************/

  const [isRendering, setIsRendering] = useState<boolean>(true)
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['

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
  const renderProfilePic = () => {
    return (
      <Col alignCenter mr16 radius100 overflow={'hidden'}>
        {!profilePicPath ? (
          <Image contentFit="fill" source={require('../../assets/images/defaultProfile.jpeg')} style={{ width: 56, height: 56 }} />
        ) : (
          <Image contentFit="fill" source={profilePicPath} style={{ width: 56, height: 56 }} />
        )}
      </Col>
    )
  }

  const renderDescriptionPreview = () => {
    return (
      <Span bodyM colorNeutral40 mb6 numberOfLines={1}>
        {postPreview}
      </Span>
    )
  }

  const renderServiceRate = () => {
    return (
      <Span headlineS colorBURed>
        $ {serviceRate}
      </Span>
    )
  }

  const renderServiceName = () => {
    return (
      <Span titleM maxW150 numberOfLines={1}>{serviceName}</Span>
    )
  }

  const renderName = () => {
    return (
      <Span titleS >
        {firstName} • {lastName}
      </Span>
    )
  }

  const renderReview = () => {
    return (
      <Row alignCenter>
        <Ionicons name={'star'} size={14} color="#FFB800" />
        <Span titleS ml5>
          {reviewRate}
        </Span>
      </Row>
    )
  }

  /***********
   * render()
   ***********/

  return (
    <Col bgNeutral100 h120 radius12 pv14 ph16 mb12 onPress={onPress}>
      <Row mb12 justifyBetween>
        <Row>
          {renderProfilePic()}
          <Col justifyBetween pv5>
            {renderServiceName()}
            <Row alignCenter>
              {renderName()}
              {renderReview()}
            </Row>
          </Col>
        </Row>
        {renderServiceRate()}
      </Row>
      {renderDescriptionPreview()}
    </Col>
  )
}

export { SerivcesCard }
