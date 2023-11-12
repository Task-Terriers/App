import React from 'react'
import { View } from 'react-native'
import { SpaceStyle } from '../types'
import { NeutralColor, extractMargin } from '../../Libs'


interface DividerComponentProps {
    color?: string
    margin?: SpaceStyle.Margin
}

const Divider: React.FC<DividerComponentProps> = ({ color, margin }) => {
    const getMargin = () => {
        if (margin) return extractMargin(margin)
        return { marginLeft: 16, marginRight: 16 }
    }

    return <View style={[{ height: 1, backgroundColor: color || NeutralColor['neutral-90'] }, getMargin()]} />
}

export { Divider }
