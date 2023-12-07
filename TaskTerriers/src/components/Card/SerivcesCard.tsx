import React, { useState, useEffect } from 'react'
import { Col, Row, Span } from '../../StyleToProps'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import ChipMedium from '../Tags/MajorTags'

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
  serviceRate: number
  serviceType?: string
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
  serviceRate,
  serviceType,
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
      <Span bodyL mb6 numberOfLines={1}>
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
      <Span titleM maxW150 numberOfLines={1}>
        {serviceName}
      </Span>
    )
  }

  const renderName = () => {
    return (
      <Span titleS>
        {firstName} • {lastName}
      </Span>
    )
  }

  const renderServiceType = () => {
    if (!serviceType) return
    return (
      <Col ml8>
        <ChipMedium type={'disabled'} title={serviceType} />
      </Col>
    )
  }

  /***********
   * render()
   ***********/

  return (
    <Col bgNeutral100 h120 radius12 pv14 ph16 mb12 onPress={onPress}>
      <Row mb12 justifyBetween>
        <Row flexShrink>
          <Col>{renderProfilePic()}</Col>
          <Col justifyBetween pv5>
            <Row alignCenter justifyBetween>
              {renderServiceName()}
              {renderServiceType()}
            </Row>
            {renderName()}
          </Col>
        </Row>
        {renderServiceRate()}
      </Row>
      <Row justifyBetween>{renderDescriptionPreview()}</Row>
    </Col>
  )
}

export { SerivcesCard }
