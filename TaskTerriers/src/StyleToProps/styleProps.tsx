import _ from 'lodash'
import React from 'react'
import { ColorValue } from 'react-native'

type numOrStr = number | string
type numOrTrue = number | true
type numOrStrOrBool = number | string | boolean

export const Colors = {
  BURed: '#CC0000',
  BUBlack: '#2D2926',
  Neutral0: '#000',
  Neutral10: '#232427',
  Neutral20: '#47494e',
  Neutral30: '#6a6d75',
  Neutral40: '#8d919c',
  Neutral50: '#b1b5c2',
  Neutral60: '#c0c4cf',
  Neutral70: '#d0d3db',
  Neutral80: '#e0e2e7',
  Neutral90: '#eff0f3',
  Neutral100: '#fff',
  AlertMinor: '#ffb800',
  AlertNormal: '#04eb04',
  AlertCritical: '#ff0000',
}

const mapPropNumberToLayoutStyle = {
  m: (n: number) => ({ margin: n }),
  mt: (n: number) => ({ marginTop: n }),
  mb: (n: number) => ({ marginBottom: n }),
  ml: (n: number) => ({ marginLeft: n }),
  mr: (n: number) => ({ marginRight: n }),
  mh: (n: number) => ({ marginHorizontal: n }),
  mv: (n: number) => ({ marginVertical: n }),
  maxW: (n: number) => ({ maxWidth: n }),
  maxH: (n: number) => ({ maxHeight: n }),
  minW: (n: number) => ({ minWidth: n }),
  minH: (n: number) => ({ minHeight: n }),
  p: (n: number) => ({ padding: n }),
  pt: (n: number) => ({ paddingTop: n }),
  pb: (n: number) => ({ paddingBottom: n }),
  pl: (n: number) => ({ paddingLeft: n }),
  pr: (n: number) => ({ paddingRight: n }),
  ph: (n: number) => ({ paddingHorizontal: n }),
  pv: (n: number) => ({ paddingVertical: n }),
  zIndex: (n: number) => ({ zIndex: n }),
  left: (n: number) => ({ left: n }),
  right: (n: number) => ({ right: n }),
  top: (n: number) => ({ top: n }),
  bottom: (n: number) => ({ bottom: n }),
  w: (n: number) => ({ width: n }),
  h: (n: number) => ({ height: n }),
  wp: (n: number) => ({ width: `${n}%` }),
  hp: (n: number) => ({ height: `${n}%` }),
  radius: (n: number) => ({ borderRadius: n }),
  radiusT: (n: number) => ({
    borderTopLeftRadius: n,
    borderTopRightRadius: n,
  }),
  radiusB: (n: number) => ({
    borderBottomLeftRadius: n,
    borderBottomRightRadius: n,
  }),
  radiusL: (n: number) => ({
    borderTopLeftRadius: n,
    borderBottomLeftRadius: n,
  }),
  radiusR: (n: number) => ({
    borderTopRightRadius: n,
    borderBottomRightRadius: n,
  }),
  radiusTL: (n: number) => ({
    borderTopLeftRadius: n,
  }),
  radiusTR: (n: number) => ({
    borderTopRightRadius: n,
  }),
  radiusBL: (n: number) => ({
    borderBottomLeftRadius: n,
  }),
  radiusBR: (n: number) => ({
    borderBottomRightRadius: n,
  }),
  borderW: (n: number) => ({ borderWidth: n }),
  borderLW: (n: number) => ({ borderLeftWidth: n }),
  borderRW: (n: number) => ({ borderRightWidth: n }),
  borderTW: (n: number) => ({ borderTopWidth: n }),
  borderBW: (n: number) => ({ borderBottomWidth: n }),
}

const mapPropToLayoutStyle = {
  h: (v: number) => ({ height: v }),
  hp: (n: number) => ({ height: `${n}%` }),
  maxH: (v: numOrStr) => ({ maxHeight: v }),
  minH: (v: numOrStr) => ({ minHeight: v }),
  w: (v: numOrStr) => ({ width: v }),
  wp: (n: number) => ({ width: `${n}%` }),
  maxW: (v: numOrStr) => ({ maxWidth: v }),
  minW: (v: numOrStr) => ({ minWidth: v }),

  // layout
  absolute: () => ({ position: 'absolute' }),
  relative: () => ({ position: 'relative' }),
  displayFlex: () => ({ display: 'flex' }),
  displayNone: () => ({ display: 'none' }),
  zIndex: (v: number) => ({ zIndex: v }),

  left: (v: numOrStrOrBool) => ({ left: v === true ? 0 : v }),
  right: (v: numOrStrOrBool) => ({ right: v === true ? 0 : v }),
  top: (v: numOrStrOrBool) => ({ top: v === true ? 0 : v }),
  bottom: (v: numOrStrOrBool) => ({ bottom: v === true ? 0 : v }),

  flex: (v: numOrTrue) => ({ flex: _.isNumber(v) ? v : 1 }),
  flexRow: () => ({ flexDirection: 'row' }),
  flexColumn: () => ({ flexDirection: 'column' }),
  flexWrap: () => ({ flexWrap: 'wrap' }),
  flexNoWrap: () => ({ flexWrap: 'nowrap' }),
  flexWrapReverse: () => ({ flexWrap: 'wrap-reverse' }),
  flexShrink: (v: numOrTrue) => ({ flexShrink: _.isNumber(v) ? v : 1 }),
  overflow: (v: 'visible' | 'hidden' | 'scroll') => ({ overflow: v }),
  overflowHidden: () => ({ overflow: 'hidden' }),
  overflowVisible: () => ({ overflow: 'visible' }),
  overflowScroll: () => ({ overflow: 'scroll' }),
  alignStart: () => ({ alignItems: 'flex-start' }),
  alignEnd: () => ({ alignItems: 'flex-end' }),
  alignCenter: () => ({ alignItems: 'center' }),
  alignStretch: () => ({ alignItems: 'stretch' }),
  alignBaseline: () => ({ alignItems: 'baseline' }),
  alignAuto: () => ({ alignItems: 'auto' }),
  alignSelfCenter: () => ({ alignSelf: 'center' }),
  alignSelfEnd: () => ({ alignSelf: 'flex-end' }),
  alignSelfStart: () => ({ alignSelf: 'flex-start' }),
  alignSelfStretch: () => ({ alignSelf: 'stretch' }),
  justifyStart: () => ({ justifyContent: 'flex-start' }),
  justifyCenter: () => ({ justifyContent: 'center' }),
  justifyEnd: () => ({ justifyContent: 'flex-end' }),
  justifyBetween: () => ({ justifyContent: 'space-between' }),
  justifyAround: () => ({ justifyContent: 'space-around' }),
  justifyEvenly: () => ({ justifyContent: 'space-evenly' }),

  // margin & padding
  m: (v: number) => ({ margin: v }),
  ml: (v: number) => ({ marginLeft: v }),
  mr: (v: number) => ({ marginRight: v }),
  mt: (v: number) => ({ marginTop: v }),
  mb: (v: number) => ({ marginBottom: v }),
  mh: (v: number) => ({ marginHorizontal: v }),
  mv: (v: number) => ({ marginVertical: v }),
  p: (v: number) => ({ padding: v }),
  pl: (v: number) => ({ paddingLeft: v }),
  pr: (v: number) => ({ paddingRight: v }),
  pt: (v: number) => ({ paddingTop: v }),
  pb: (v: number) => ({ paddingBottom: v }),
  ph: (v: number) => ({ paddingHorizontal: v }),
  pv: (v: number) => ({ paddingVertical: v }),
  // // opacity
  opacity: (v: number) => ({ opacity: v }),
  // //shadow
  shadowColor: (v: string) => ({ shadowColor: v }),
  shadowOpacity: (v: number) => ({ shadowOpacity: v }),
  shadowRadius: (v: number) => ({ shadowRadius: v }),

  bg: (v: ColorValue) => ({ backgroundColor: v }),

  // // border styl
  dotted: () => ({ borderStyle: 'dotted' }),
  solid: () => ({ borderStyle: 'solid' }),
  dashed: () => ({ borderStyle: 'dashed', borderRadius: 1 }),

  // // border color
  borderColor: (v: ColorValue) => ({ borderColor: v }),
  borderLColor: (v: ColorValue) => ({ borderLeftColor: v }),
  borderRColor: (v: ColorValue) => ({ borderRightColor: v }),
  borderTColor: (v: ColorValue) => ({ borderTopColor: v }),
  borderBColor: (v: ColorValue) => ({ borderBottomColor: v }),

  // // border radius
  radius: (v: number) => ({ borderRadius: v }),
  radiusT: (v: number) => ({
    borderTopLeftRadius: v,
    borderTopRightRadius: v,
  }),
  radiusB: (v: number) => ({
    borderBottomLeftRadius: v,
    borderBottomRightRadius: v,
  }),
  radiusL: (v: number) => ({
    borderTopLeftRadius: v,
    borderBottomLeftRadius: v,
  }),
  radiusR: (v: number) => ({
    borderTopRightRadius: v,
    borderBottomRightRadius: v,
  }),
  radiusTL: (v: number) => ({ borderTopLeftRadius: v }),
  radiusTR: (v: number) => ({ borderTopRightRadius: v }),
  radiusBL: (v: number) => ({ borderBottomLeftRadius: v }),
  radiusBR: (v: number) => ({ borderBottomRightRadius: v }),

  // border width
  borderW: (v: number) => ({ borderWidth: v }),
  borderLW: (v: number) => ({ borderLeftWidth: v }),
  borderRW: (v: number) => ({ borderRightWidth: v }),
  borderTW: (v: number) => ({ borderTopWidth: v }),
  borderBW: (v: number) => ({ borderBottomWidth: v }),
}

const mapPropToTextStyle = {
  displayL: () => ({ fontSize: 57, letterSpacing: 0, lineHeight: 64, fontFamily: 'Pretendard-Bold' }),
  displayM: () => ({ fontSize: 45, letterSpacing: 0, lineHeight: 52, fontFamily: 'Pretendard-Bold' }),
  displayS: () => ({ fontSize: 40, letterSpacing: 0, lineHeight: 44, fontFamily: 'Pretendard-Bold' }),
  headlineL: () => ({ fontSize: 32, letterSpacing: 0, lineHeight: 40, fontFamily: 'Pretendard-Bold' }),
  headlineM: () => ({ fontSize: 28, letterSpacing: 0, lineHeight: 36, fontFamily: 'Pretendard-Bold' }),
  headlineS: () => ({ fontSize: 24, letterSpacing: 0, lineHeight: 32, fontFamily: 'Pretendard-Bold' }),
  titleXL: () => ({ fontSize: 20, letterSpacing: 0, lineHeight: 28, fontFamily: 'Pretendard-SemiBold' }),
  titleL: () => ({ fontSize: 17, letterSpacing: 0, lineHeight: 28, fontFamily: 'Pretendard-SemiBold' }),
  titleM: () => ({ fontSize: 15, letterSpacing: 0.15, lineHeight: 24, fontFamily: 'Pretendard-SemiBold' }),
  titleS: () => ({ fontSize: 13, letterSpacing: 0.1, lineHeight: 20, fontFamily: 'Pretendard-SemiBold' }),
  labelL: () => ({ fontSize: 14, letterSpacing: 0.1, lineHeight: 20, fontFamily: 'Pretendard-Bold' }),
  labelM: () => ({ fontSize: 12, letterSpacing: 0.5, lineHeight: 16, fontFamily: 'Pretendard-Bold' }),
  labelS: () => ({ fontSize: 10, letterSpacing: 0.5, lineHeight: 16, fontFamily: 'Pretendard-Bold' }),
  bodyL: () => ({ fontSize: 15, letterSpacing: 0.15, lineHeight: 24, fontFamily: 'Pretendard-Regular' }),
  bodyM: () => ({ fontSize: 13, letterSpacing: 0.15, lineHeight: 20, fontFamily: 'Pretendard-Regular' }),
  bold: () => ({ fontFamily: 'Pretendard-Bold' }),
  semiBold: () => ({ fontFamily: 'Pretendard-SemiBold' }),
  color: (v: ColorValue) => ({ color: v }),
  fontSize: (v: number) => ({ fontSize: v }),
  italic: () => ({ fontStyle: 'italic' }),
  weight: (v: number) => ({ fontWeight: v }),
  // bold: () => ({ fontWeight: "bold" }),
  alignCenter: () => ({ textAlign: 'center' }),
  alignLeft: () => ({ textAlign: 'left' }),
  alignRight: () => ({ textAlign: 'right' }),
  alignJustify: () => ({ textAlign: 'justify' }),
  alignAuto: () => ({ textAlign: 'auto' }),
  lineHeight: (v: number) => ({ lineHeight: v }),
  decoNone: () => ({ textDecorationLine: 'none' }),
  decoLine: (v: string) => ({ textDecorationLine: v }),
  underline: () => ({ textDecorationLine: 'underline' }),
  lineThrough: () => ({ textDecorationLine: 'line-through' }),
  shadowOffset: (v: number) => ({ textShadowOffset: v }),
  shadowColor: (v: ColorValue) => ({ textShadowColor: v }),
  shadowRadius: (v: number) => ({ txtShadowRadius: v }),
  fontFamily: (v: string) => ({ fontFamily: v }),
  letterSpacing: (v: number) => ({ letterSpacing: v }),
  uppercase: () => ({ textTransform: 'uppercase' }),
  lowercase: () => ({ textTransform: 'lowercase' }),
  capitalize: () => ({ textTransform: 'capitalize' }),
}

// colors
Object.entries(Colors).forEach(([key, colorCode]) => {
  const alpha = (v: number) => {
    if (v >= 100) return { backgroundColor: colorCode }
    const numStr = ('0' + v).slice(-2)
    return { backgroundColor: colorCode + numStr }
  }

  // layout number
  mapPropNumberToLayoutStyle[`bg${key}Alpha`] = alpha // layout
  // layout
  mapPropToLayoutStyle[`bg${key}`] = () => ({ backgroundColor: colorCode })
  mapPropToLayoutStyle[`bg${key}Alpha`] = alpha
  mapPropToLayoutStyle[`border${key}`] = () => ({ borderColor: colorCode })
  mapPropToLayoutStyle[`borderL${key}`] = () => ({ borderLeftColor: colorCode })
  mapPropToLayoutStyle[`borderR${key}`] = () => ({ borderRightColor: colorCode })
  mapPropToLayoutStyle[`borderT${key}`] = () => ({ borderTopColor: colorCode })
  mapPropToLayoutStyle[`borderB${key}`] = () => ({ borderBottomColor: colorCode })
  // text
  mapPropToTextStyle[`color${key}`] = () => ({ color: colorCode })
})

type LayoutColorProps =
  | `bg${string & keyof typeof Colors}`
  | `bg${string & keyof typeof Colors}Alpha`
  | `border${string & keyof typeof Colors}`
  | `borderL${string & keyof typeof Colors}`
  | `borderR${string & keyof typeof Colors}`
  | `borderT${string & keyof typeof Colors}`
  | `borderB${string & keyof typeof Colors}`
export type LayoutColorType = { [key in LayoutColorProps]?: true }
type LayoutTemplateLiteral = `${string & keyof typeof mapPropNumberToLayoutStyle}${number}`
type LayoutNumberType = { [key in LayoutTemplateLiteral]?: boolean }
type LayoutPropType = { [key in keyof typeof mapPropToLayoutStyle]?: numOrStrOrBool }

type TextColorProps = `color${string & keyof typeof Colors}`
type TextColorType = { [key in TextColorProps]?: true }
type TextPropType = { [key in keyof typeof mapPropToTextStyle]?: numOrStrOrBool }

type SingleOrArray<T> = T | T[]
export type StyleComp = SingleOrArray<React.ReactElement | boolean>

type LayoutType = LayoutPropType &
  LayoutColorType &
  LayoutNumberType & {
    _style?: StyleComp
    _isVisible?: boolean
  }

type TextType = TextPropType &
  TextColorType & {
    _style?: StyleComp
    _isVisible?: boolean
  }

const Style: React.FC<Omit<LayoutType, '_style'>> = props => (
  <React.Fragment {...props}>
    <></>
  </React.Fragment>
)
const TStyle: React.FC<Omit<TextType, '_style'>> = props => (
  <React.Fragment {...props}>
    <></>
  </React.Fragment>
)

export { Style, TStyle, mapPropNumberToLayoutStyle, mapPropToLayoutStyle, mapPropToTextStyle }
export type { LayoutType, TextType }
