import React from 'react'
import { Div, DivPropsType } from '.'

export const Col = (props: DivPropsType) => {
  return <Div {...props} flexColumn />
}
