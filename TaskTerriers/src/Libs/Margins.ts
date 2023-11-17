import { SpaceStyle } from '../components/types'

export const extractMargin = (margin: SpaceStyle.Margin) => {
  const getMarginDirection = direction => {
    if (!margin || typeof margin === 'number') return margin || 0
    return margin?.[direction] || 0
  }
  return {
    marginLeft: getMarginDirection('left'),
    marginRight: getMarginDirection('right'),
    marginTop: getMarginDirection('top'),
    marginBottom: getMarginDirection('bottom'),
  }
}

export const extractPadding = (padding: SpaceStyle.Margin) => {
  const getPaddingDirection = direction => {
    if (!padding || typeof padding === 'number') return padding || 0
    return padding?.[direction] || 0
  }
  return {
    paddingTop: getPaddingDirection('top'),
    paddingBottom: getPaddingDirection('bottom'),
    paddingLeft: getPaddingDirection('left'),
    paddingRight: getPaddingDirection('right'),
  }
}
