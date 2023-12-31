import React from 'react'
import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import { Image } from 'expo-image'
import { ButtonComponentProps } from '.'
import { AlertColor, extractMargin, NeutralColor, TypographyColorType } from '../../Libs'
import { TypographyType } from '../types'
import { Span } from '../../StyleToProps'

interface WarningButtonProps extends ButtonComponentProps {
  warningStyle: 'outline' | 'fill'
}

const WarningButton: React.FC<WarningButtonProps> = ({ isFullWithBtn, isProgress, text, size, icon, margin, onPress, warningStyle }) => {
  /************
   * function
   ************/

  const getBackgroundColor = () => {
    if (warningStyle == 'outline') return NeutralColor['neutral-90']
    return AlertColor['alert-critical']
  }

  const getBorderColor = () => {
    if (warningStyle == 'outline') return AlertColor['alert-critical']
    return NeutralColor['neutral-10']
  }

  const getTextColor = (): TypographyColorType.Key => {
    if (warningStyle == 'outline') return NeutralColor['neutral-0']
    return NeutralColor['neutral-100']
  }

  const getText = (): ReturnType<() => TypographyType.Attr> => {
    if (typeof text === 'string') return { value: `${text}`, bold: 'bold' }
    else if (typeof text === 'object') return { value: `${text?.value}`, bold: text?.bold || 'bold' }
  }

  const getHeight = () => {
    if (size === 'medium') return 40
    return 32
  }

  /*********
   * render
   *********/

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
          {/* {renderIcon()} */}
          {renderTitle()}
        </View>
      )
    }
  }

  return (
    <TouchableOpacity
      disabled={isProgress}
      style={[
        {
          backgroundColor: getBackgroundColor(),
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

export { WarningButton }
