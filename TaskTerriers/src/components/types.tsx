import { TypographyColorType } from './Libs'
import { ButtonStyle } from '@newClassumDesign/Buttons'

declare namespace SpaceStyle {
  type Margin = number | Inset
  type Inset = { left?: number; top?: number; right?: number; bottom?: number }
}

const Size = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  X_LARGE: 'xlarge',
  XX_LARGE: 'xxlarge',
  XXX_LARGE: 'xxxlarge',
} as const

export const IconNames = {
  RequestOutline: 'help-buoy-outline',
  Request: 'help-buoy',
  SeviceOutline: 'construct-outline',
  Service: 'construct',
  Message: 'chatbox-ellipses',
  MessageOutline: 'chatbox-ellipses-outline',
  Setting: 'settings-sharp',
  SettingOutline: 'settings-outline',
} as const

declare namespace IconName {
  type Value = (typeof IconNames)[keyof typeof IconNames]
}

declare namespace ComponentStyle {
  type Theme = 'light' | 'dark'
  type Size = (typeof Size)[keyof typeof Size]
  type SizeWithObject = Size | { width: number; height: number }
  type State = 'enabled' | 'pressed' | 'selected' | 'disabled' | 'activeDisabled' | 'progress'
}

declare namespace ColorStyle {
  type Value = 'white' | 'primary' | 'secondary' | 'normal' | 'abnormal' | '#ffffff' | '#0c0e12'
}

declare namespace TypographyType {
  type Weight = 'bold' | 'semi-bold' | 'regular'
  type Value = string | Attr | Attr[]
  type TextAlign = 'auto' | 'left' | 'right' | 'center' | 'justify'

  interface Attr {
    value: string
    bold?: Weight
    color?: TypographyColorType.Key
    textAlign?: TextAlign
    textDecorationLine?: 'underline' | 'line-through' | 'none'
    onPress?: () => void
    numberOfLine?: number
    fontFamily?: string
    isCodeText?: boolean
  }
  interface AttrWithOnPress extends Attr {
    disable?: boolean
    onPress?: (e?) => void
  }
}

const IconSizeMap = {
  small: 18,
  medium: 24,
  large: 32,
  xlarge: 48,
} as const

declare namespace IconType {
  type ImageSource = string | number
  type ImageSourceOfState = {
    enabled: ImageSource
    pressed?: ImageSource
    selected?: ImageSource
    disabled?: ImageSource
  }
  type IconSource = ImageSource | ImageSourceOfState
  type Style = {
    aspectRatio?: number
    width: number | '100%'
    height: number | '100%'
  }
  type Position = 'left' | 'right'
  type Shape = 'circle' | 'square'
  interface Attr {
    size?: ComponentStyle.SizeWithObject
    src: IconSource
    position?: Position
    shape?: Shape
    data?: IconExtraData
    state?: ComponentStyle.State
  }

  interface AttrWithOnPress extends Attr {
    disable?: boolean
    onPress?: (e?) => void
  }

  interface IconExtraData {
    count: number
    label?: string
    isSelected?: boolean
    isDisabled?: boolean
  }
}

const ButtonSizeMap = {
  small: 32,
  medium: 40,
  large: 48,
  xlarge: 56,
} as const
declare namespace ButtonType {
  interface Attr {
    isFullWidthBtn?: boolean
    isProgress?: boolean
    hasBorder?: boolean
    text?: TypographyType.Attr
    size: ButtonStyle.Size
    icon?: IconType.AttrWithOnPress
    state?: ButtonStyle.State
    theme?: ButtonStyle.Theme
    margin?: SpaceStyle.Margin
    onPress: () => void
  }
  interface AttrWithType extends Attr {
    type: 'A' | 'B' | 'C'
  }
}

const ListItemSizeMap: Record<ComponentStyle.Size, number> = {
  small: 40,
  medium: 56,
  large: 64,
  xlarge: 72,
  xxlarge: 80,
  xxxlarge: 110,
} as const

const ListItemPaddingVerticalMap: Record<ComponentStyle.Size, number> = {
  small: 8,
  medium: 0,
  large: 0,
  xlarge: 0,
  xxlarge: 0,
  xxxlarge: 0,
} as const
declare namespace ListItemType {}

declare namespace TabBarType {
  type Value = Attr | string
  interface Attr {
    text: TypographyType.Value
    enabled?: boolean
  }
}

declare namespace DialogType {
  interface Attr {
    source?: IconType.ImageSource
    title: string
    content?: string | TypographyType.Attr[]
    buttons?: ButtonType.AttrWithType[]
    blockPressBackDrop?: boolean
    keepModalOn?: boolean
  }
}
declare namespace ProgressDashboardTabType {
  interface Attr {
    key: ViewProgressStatus
    text: TypographyType.Attr
    onPress?: () => void
    blank: BlankSourceType.Attr
  }
}

declare namespace BlankSourceType {
  type ImageSource = string | number
  type ImageSourceOfState = {
    normal: ImageSource
    selected?: ImageSource
    disabled?: ImageSource
    progress?: ImageSource
  }
  type IconSource = ImageSource | ImageSourceOfState

  interface Attr {
    src: IconSource
    title: TypographyType.Attr
    subTitle: TypographyType.Attr
    button?: ButtonType.AttrWithType
  }
}

const TEXT_INPUT_SIZE_MAP = {
  small: 40,
  medium: 44,
} as const
type TEXT_INPUT_SIZE_MAP = (typeof TEXT_INPUT_SIZE_MAP)[keyof typeof TEXT_INPUT_SIZE_MAP]

export { IconSizeMap, ButtonSizeMap, ListItemSizeMap, ListItemPaddingVerticalMap, TEXT_INPUT_SIZE_MAP }
export type {
  TypographyType,
  SpaceStyle,
  ButtonType,
  IconName,
  IconType,
  ListItemType,
  TabBarType,
  DialogType,
  ProgressDashboardTabType,
  ComponentStyle,
  ColorStyle,
}
