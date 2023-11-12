export * from './UniversalButton'

import { BackgroundColorType, UniversalColorType } from '../../Libs/Colors'
import { IconType, SpaceStyle, TypographyType } from '../types'

export interface ButtonComponentProps {
    isProgress?: boolean
    isFullWithBtn?: boolean
    text?: TypographyType.Attr
    size: ButtonStyle.Size
    icon?: IconType.AttrWithOnPress
    state?: ButtonStyle.State
    theme?: ButtonStyle.Theme
    margin?: SpaceStyle.Margin
    onPress: () => void
    backgroundColor?: BackgroundColorType.Value
    overwriteColor?: UniversalColorType.Value
    overwriteBackgroundColor?: UniversalColorType.Value
}

const ButtonSize = {
    SMALL: 'small',
    MEDIUM: 'medium',
} as const

export declare namespace ButtonStyle {
    type Theme = 'light' | 'dark'
    type Size = (typeof ButtonSize)[keyof typeof ButtonSize]
    type State = 'enabled' | 'disabled'
    type Warning = 'outlined' | 'filled'
}
