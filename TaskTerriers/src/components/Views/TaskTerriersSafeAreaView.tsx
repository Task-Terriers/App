import React, { ReactNode, useCallback, useState } from 'react'
import { ColorValue, View, StatusBar, StatusBarStyle, ViewStyle } from 'react-native'

import { useSafeAreaInsets } from 'react-native-safe-area-context'

// import { deviceInfo } from '../../utilities/deviceInfo'

import { NeutralColor } from '../../Libs/Colors'
import { useFocusEffect } from '@react-navigation/native'
import { deviceInfo } from '../../utilities/deviceInfo'

interface Props {
    children: ReactNode | ReactNode[]

    style?: ViewStyle
    hasBottomSpace?: boolean
    backgroundColor?: ColorValue

    headerColor?: ColorValue
    statusBar?: StatusBarStyle
}

const TaskTerriersSafeAreaView: React.FC<Props> = (props: Props) => {
    /*********
     * state
     *********/
    const [statusBar, setStatusBar] = useState<StatusBarStyle>(props.statusBar || 'dark-content')
    /**************
     * life cycles
     **************/

    useFocusEffect(
        useCallback(() => {
            if (statusBar !== 'light-content') setStatusBar('dark-content')
            return () => {
                setStatusBar('dark-content')
            }
        }, []),
    )

    /*********
     * render()
     *********/

    const renderStatusBar = () => {
        if (deviceInfo.isAndroid) return 'dark-content'
        return statusBar
    }

    const { top, bottom } = useSafeAreaInsets()

    return (
        <>
            <View style={{ backgroundColor: props.headerColor || NeutralColor['neutral-100'], height: top, zIndex: 1 }} />
            <StatusBar barStyle={renderStatusBar()} />
            <View
                style={[
                    {
                        flex: 1,
                        backgroundColor: props?.backgroundColor || NeutralColor['neutral-100'],
                        paddingBottom: props.hasBottomSpace ? bottom : undefined,
                    },
                    props.style,
                ]}>
                {props.children}
            </View>
        </>
    )
}

export default TaskTerriersSafeAreaView
