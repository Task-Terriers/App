export * from './UniversalButton'
export * from './WarningButton'

import { BackgroundColorType, UniversalColorType } from '../../Libs/Colors'
import { IconType, SpaceStyle, TypographyType } from '../types'

export interface ButtonComponentProps {
  isProgress?: boolean
  isFullWithBtn?: boolean
  text?: TypographyType.Attr
  size: ButtonStyle.Size
  icon?: React.ReactElement
  state?: ButtonStyle.State
  theme?: ButtonStyle.Theme
  margin?: SpaceStyle.Margin
  onPress: () => void
  backgroundColor?: BackgroundColorType.Value
  overwriteColor?: UniversalColorType.Value
  overwriteBackgroundColor?: UniversalColorType.Value
  hasBorder?: boolean
}

const ButtonSize = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
} as const

export declare namespace ButtonStyle {
  type Theme = 'light' | 'dark'
  type Size = (typeof ButtonSize)[keyof typeof ButtonSize]
  type State = 'enabled' | 'disabled'
}
