import React from 'react'
import { TextInputProps as OriginTextInputProps, TextInput } from 'react-native'
import { ComponentStyle, IconType, SpaceStyle } from '../types'
import { UniversalColorType } from '../../Libs'

export interface TextInputsProps extends OriginTextInputProps {
  required?: boolean
  size?: ComponentStyle.Size
  maxCharacter?: number
  minCharacter?: number
  hideClearButton?: boolean
  hideLimitText?: boolean
  textAlignCenter?: boolean
  onChangeText?: (text: string, isValid?: boolean) => void
  maxRange?: number
  minRange?: number
  iconGroup?: IconType.Attr[]
  inputRef?: React.RefObject<TextInput>
  onValidationText?: (text: string) => boolean
  margin?: SpaceStyle.Margin
  onPressClearButton?: () => void
  customValidation?: boolean
  borderRadius?: number
  backgroundColor?: UniversalColorType.Value
  disabled?: boolean
}

export * from './BasicTextInput'
export * from './TextInputWithHeightChange'
