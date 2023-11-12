import React from 'react'
import { Colors, LayoutType, mapPropNumberToLayoutStyle, mapPropToLayoutStyle, mapPropToTextStyle, StyleComp, TextType } from './styleProps'
import { StyleProp, TextProps, TextStyle, TouchableOpacityProps, ViewStyle } from 'react-native'

const extractStylesFromComponent = (compOrArray: StyleComp, map: any, numberMap?: any) => {
  if (!Array.isArray(compOrArray)) compOrArray = [compOrArray]
  const ret: any = {}
  for (const component of compOrArray) {
    if (typeof component === 'boolean') continue
    const { _style, ...props } = (component as JSX.Element).props
    const [mergedStyle] = convertPropsToMergedStyles(props, map, numberMap)
    for (const key in mergedStyle) {
      ret[key] = mergedStyle[key]
    }
  }
  return ret
}

const convertPropsToMergedStyles = (props: { [kay: string]: any }, map: any, numberMap?: any): [ViewStyle, TouchableOpacityProps] => {
  let mergedStyles: ViewStyle = {}
  const otherProps: TouchableOpacityProps = { activeOpacity: 1, disabled: true }
  for (const propName in props) {
    const propValue = props[propName]

    if (propName === '_style') {
      const extractedStyles = extractStylesFromComponent(propValue, map, numberMap)
      mergedStyles = { ...mergedStyles, ...extractedStyles }
    }

    if (propName === '_isVisible') {
      mergedStyles = { ...mergedStyles, display: propValue ? 'flex' : 'none' }
    }

    const func = map[propName]
    if (typeof func === 'function') {
      if (typeof propValue === 'boolean' && !propValue) continue
      const f = func(propValue)
      // use for-in loop for performance
      for (const key in f) {
        mergedStyles[key] = f[key]
      }
      continue
    }

    // check if prop starts with string and ends with number ex) m100
    if (numberMap) {
      if (propName.match(/[A-Za-z]+[0-9]+/s)) {
        const result = propName.match(/[0-9]+/s)
        if (!result) continue
        const number = Number(result[0])
        const prefix = propName.substring(0, result.index)
        const layoutFunc = mapPropNumberToLayoutStyle[prefix]
        if (typeof layoutFunc === 'function') {
          const f = layoutFunc(number)
          // use for-in loop for performance
          for (const key in f) {
            mergedStyles[key] = f[key]
          }
          continue
        }
      }
    }

    if (propName === 'onPress' && otherProps.disabled !== false && typeof propValue === 'function') {
      otherProps.disabled = false
      otherProps.activeOpacity = 0.2
    }

    otherProps[propName] = propValue
  }

  return [mergedStyles, otherProps]
}

const toStyle = (styleComp: React.ReactElement) => {
  const { style, ...targetProps } = styleComp.props
  if (style) {
    console.warn('StyleProps: toStyle ignore React Native style prop')
  }
  const [mergedStyles] = convertPropsToMergedStyles(targetProps, mapPropToLayoutStyle, mapPropNumberToLayoutStyle)
  return mergedStyles
}

interface DefaultProps extends TouchableOpacityProps {
  style?: StyleProp<ViewStyle>
}

const withLayoutStyleProps = <Props extends DefaultProps, RefType>(WrappedComponent: React.ForwardRefRenderFunction<RefType, DefaultProps>) => {
  return React.forwardRef<RefType, Props & LayoutType>((props, ref) => {
    const { style, ...targetProps } = props
    const [mergedStyles, otherProps] = convertPropsToMergedStyles(targetProps, mapPropToLayoutStyle, mapPropNumberToLayoutStyle)

    if (mergedStyles.display === 'none') return null
    return WrappedComponent({ ...otherProps, style: [style, mergedStyles] }, ref)
  })
}

const toTextStyle = (styleComp: React.ReactElement) => {
  const { style, ...targetProps } = styleComp.props
  if (style) {
    console.warn('StyleProps: toTextStyle ignore React Native style prop')
  }
  const defaultStyle = {
    fontFamily: 'Pretendard-Bold',
  }
  const [mergedStyles] = convertPropsToMergedStyles(targetProps, { ...mapPropToTextStyle, ...mapPropToLayoutStyle }, mapPropNumberToLayoutStyle)
  return [defaultStyle, mergedStyles]
}

const withTextStyleProps = <Props extends { style?: StyleProp<TextStyle> }, RefType>(
  WrappedComponent: React.ForwardRefRenderFunction<RefType, TextProps>,
) => {
  return React.forwardRef<RefType, Props & TextType & LayoutType>((props, ref) => {
    const { style, ...targetProps } = props
    const defaultStyle: TextStyle = { color: Colors.Neutral10 }
    const [mergedStyles, otherProps] = convertPropsToMergedStyles(
      targetProps,
      { ...mapPropToTextStyle, ...mapPropToLayoutStyle },
      mapPropNumberToLayoutStyle,
    )
    return WrappedComponent({ ...otherProps, style: [defaultStyle, style, mergedStyles] }, ref)
  })
}

export { toStyle, withLayoutStyleProps, toTextStyle, withTextStyleProps }
