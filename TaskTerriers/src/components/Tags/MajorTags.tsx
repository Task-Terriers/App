import React from 'react'
import { SpaceStyle, TypographyType } from '../types'
import { NeutralColor, extractMargin } from '../../Libs'
import { Col, Row, Span } from '../../StyleToProps'
import { Octicons } from '@expo/vector-icons'

export type chipState = 'typing' | 'enabled' | 'pressed' | 'selected' | 'disabled' | 'loading'

interface ChipMediumProps {
  hasHashTag?: boolean
  isEditing?: boolean
  type: chipState
  title: TypographyType.Value
  margin?: SpaceStyle.Margin
  onPressChip?: () => void
  onPressClose?: () => void
  onChangeText?: (value: string) => void
}

const ChipMedium: React.FC<ChipMediumProps> = ({ hasHashTag, isEditing, type, title, margin, onPressChip, onPressClose, onChangeText }) => {
  /************
   * function
   ************/

  const getBackgroundColor = () => {
    if (type === 'pressed') return NeutralColor['neutral-70']
    return NeutralColor['neutral-80']
  }

  /*********
   * render
   *********/

  /*********
   * render()
   *********/

  const _margin = extractMargin(margin)

  return (
    <Row
      bg={getBackgroundColor()}
      maxW120
      h30
      ph8
      radius12
      alignCenter
      justifyCenter
      mr={_margin.marginRight}
      mb={_margin.marginBottom}
      ml={_margin.marginLeft}
      mt={_margin.marginTop}
      onPress={onPressChip}>
      <Span labelM ml6>
        {title.toString()}
      </Span>
      <Col ml7 _isVisible={isEditing} onPress={onPressClose}>
        <Octicons name="x-circle" color={NeutralColor['neutral-50']} size={16} />
      </Col>
    </Row>
  )
}

export default ChipMedium
