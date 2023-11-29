import React, { useState, useEffect } from 'react'
import { Col, Row, Span } from '../../StyleToProps'
import { Image } from 'expo-image'

interface RequestsCardProps {
  // datasource: {} this should come from the backend.
  // will use different props for now to show example.
  firstName: string
  lastName: string
  postPreview?: string
  hideKebabMenu?: boolean
  profilePicPath?: string
  major: string
  numOfReview: number,
  reviewRate: number,
  serviceRate: number
  onPress?: () => void
}

const SerivcesCard: React.FC<RequestsCardProps> = ({ firstName, lastName, postPreview, hideKebabMenu, profilePicPath, major, numOfReview, reviewRate, serviceRate, onPress }) => {

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
        {!profilePicPath ? <Image contentFit="fill" source={require('../../assets/images/defaultProfile.jpeg')} style={{ width: 56, height: 56 }} /> :
          <Image contentFit="fill" source={profilePicPath} style={{ width: 56, height: 56 }} />}
      </Col>
    )
  }

  const renderMajor = () => {
    return (
      <Span titleS>
        Major : {major}
      </Span>
    )
  }

  const renderDescriptionPreview = () => {
    return (
      <Span bodyM colorNeutral40>{postPreview}</Span>
    )
  }

  const renderServiceRate = () => {
    return (
      <Span headlineL colorBURed>$ {serviceRate}</Span>
    )
  }

  const renderName = () => {
    return (
      <Span labelL mb6>
        {firstName} • {lastName}
      </Span>
    )
  }


  /***********
   * render()
   ***********/

  return (
    <Col bgNeutral100 h150 radius12 ph12 pv14 mb12 onPress={onPress}>
      <Row mb12 justifyBetween>
        <Row>
          {renderProfilePic()}
          <Col>
            {renderName()}
            {renderMajor()}
          </Col>
        </Row>
        {renderServiceRate()}
      </Row>
      <Col>
        {renderDescriptionPreview()}
      </Col>
    </Col>
  )
}


export { SerivcesCard }
