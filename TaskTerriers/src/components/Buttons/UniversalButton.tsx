import React from 'react'
import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import { Image } from 'expo-image'
import { ButtonComponentProps } from '.'
import { extractMargin, NeutralColor, TypographyColorType } from '../../Libs'
import { TypographyType } from '../types'
import { Col, Span } from '../../StyleToProps'

const UniversalButton: React.FC<ButtonComponentProps> = ({
  isFullWithBtn,
  isProgress,
  text,
  size,
  icon,
  state,
  margin,
  onPress,
  backgroundColor,
  hasBorder,
}) => {
  /************
   * function
   ************/

  const getBackgroundColor = () => {
    if (backgroundColor) return backgroundColor
    if (!state || state === 'enabled') return NeutralColor['neutral-90']
    else if (state === 'disabled') return NeutralColor['neutral-70']
  }

  const getBorderColor = () => {
    if (state === 'disabled') return NeutralColor['neutral-30']
    if (hasBorder) {
      return NeutralColor['neutral-10']
    }
    return 'transparent'
  }

  const getTextColor = (): TypographyColorType.Key => {
    if (!text) return undefined
    if (text?.color) return text?.color
    else if (state === 'disabled') return NeutralColor['neutral-40']
    else return NeutralColor['neutral-0']
  }

  const getText = (): ReturnType<() => TypographyType.Attr> => {
    if (typeof text === 'string') return { value: `${text}`, bold: 'bold' }
    else if (typeof text === 'object') return { value: `${text?.value}`, bold: text?.bold || 'bold' }
  }

  const getHeight = () => {
    if (size === 'medium') return 40
    return 32
  }

  const getPaddingObj = () => {
    if (isProgress || (!text && icon)) {
      if (size === 'medium') return { padding: 8 }
      return { padding: 7 }
    }
    if (text && icon) {
      if (size === 'medium') return { paddingLeft: 16, paddingRight: 24 }
      return { paddingLeft: 12, paddingRight: 16 }
    }
    if (text && !icon) {
      if (size === 'medium') return { paddingHorizontal: 24 }
      return { paddingHorizontal: 16 }
    }
  }

  /*********
   * render
   *********/

  const renderIcon = () => {
    if (!icon) return null
    return <Col pr={text ? 8 : 0}>{icon}</Col>
  }

  const renderTitle = () => {
    if (size === 'medium')
      return (
        <Span labelL color={getTextColor()} numberOfLines={1}>
          {getText()?.value}
        </Span>
      )
    return (
      <Span labelM color={getTextColor()} numberOfLines={1}>
        {getText()?.value}
      </Span>
    )
  }

  const renderContent = () => {
    if (isProgress) {
      return (
        <View style={{ width: isFullWithBtn ? '100%' : undefined, alignItems: 'center' }}>
          <ActivityIndicator size={'small'} color={'grey'} />
        </View>
      )
    } else {
      return (
        <View style={{ width: isFullWithBtn ? '100%' : undefined, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
          {renderIcon()}
          {renderTitle()}
        </View>
      )
    }
  }

  return (
    <TouchableOpacity
      disabled={state === 'disabled' || isProgress}
      style={[
        {
          backgroundColor: getBackgroundColor(),
          flexShrink: 1,
          flexDirection: 'row',
          borderWidth: 2,
          borderRadius: 12,
          borderColor: getBorderColor(),
          justifyContent: 'center',
          alignItems: 'center',
          width: isFullWithBtn ? '100%' : undefined,
          height: getHeight(),
        },
        getPaddingObj(),
        extractMargin(margin),
      ]}
      onPress={onPress}>
      {renderContent()}
    </TouchableOpacity>
  )
}

export { UniversalButton }
