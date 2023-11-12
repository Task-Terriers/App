import React from 'react'
import { Div, DivPropsType } from '.'

export const Row = (props: DivPropsType) => {
  return <Div {...props} flexRow />
}
