import React from 'react'
import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import { Image } from 'expo-image'
import { ButtonComponentProps } from '.'
import { BUColor, extractMargin, NeutralColor, TypographyColorType } from '../../Libs'
import { TypographyType } from '../types'
import { Col, Span } from '../../StyleToProps'
import { deviceInfo } from '../../utilities/deviceInfo'

interface FloatingButtonProps extends ButtonComponentProps {
  isRound?: boolean
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
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
  isRound,
}) => {
  /************
   * function
   ************/

  const getBackgroundColor = () => {
    if (backgroundColor) return backgroundColor
    if (!state || state === 'enabled') return BUColor['red']
    else if (state === 'disabled') return NeutralColor['neutral-70']
  }

  const getBorderColor = () => {
    if (hasBorder) {
      return NeutralColor['neutral-10']
    }
    if (state === 'disabled') return NeutralColor['neutral-30']
    return 'transparent'
  }

  const getTextColor = (): TypographyColorType.Key => {
    if (!text) return undefined
    if (text?.color) return text?.color
    else if (state === 'disabled') return NeutralColor['neutral-40']
    else return NeutralColor['neutral-100']
  }

  const getText = (): ReturnType<() => TypographyType.Attr> => {
    if (typeof text === 'string') return { value: `${text}`, bold: 'bold' }
    else if (typeof text === 'object') return { value: `${text?.value}`, bold: text?.bold || 'bold' }
  }

  const getHeight = () => {
    if (size == 'large') return 52
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

  const getPositionWhenFullWidth = () => {
    return (deviceInfo.size.width - deviceInfo.size.width * 0.9) / 2
  }

  /*********
   * render
   *********/

  const renderIcon = () => {
    if (!icon) return null
    return <Col mr8>{icon}</Col>
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
          position: 'absolute',
          bottom: 20,
          zIndex: 1,
          right: isFullWithBtn ? getPositionWhenFullWidth() : 16,
          backgroundColor: getBackgroundColor(),
          flexShrink: 1,
          flexDirection: 'row',
          borderWidth: 2,
          borderRadius: 100,
          borderColor: getBorderColor(),
          justifyContent: 'center',
          alignItems: 'center',
          width: isFullWithBtn ? '90%' : undefined,
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

export { FloatingButton }
