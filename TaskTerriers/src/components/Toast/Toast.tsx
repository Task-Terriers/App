import React, { useState, useEffect, useRef } from 'react'
import { View, Text, ViewStyle, StyleSheet, BackHandler, TouchableOpacity, NativeEventSubscription, TouchableWithoutFeedback, Animated } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { deviceInfo } from '../../utilities/deviceInfo'
import { AlertColor, BUColor } from '../../Libs'
import { Col, Row, Span } from '../../StyleToProps'

export type ToastType = 'normal' | 'warning' | 'complete' | 'error'
export interface NewToastAlertProps {
    type?: ToastType
    message: string
    duration?: number
    tabVisible?: boolean
    closeToastAlert?: () => void

    isSnackBar?: boolean
    isDirectClose?: boolean
    snackBarBtnLabel?: string
    snackBarAction?: () => void
    bottomMargin?: number
    hasBottomBtn?: boolean

    target?: 'bottomTab' | 'bottomButton'
}

const Toast: React.FC<NewToastAlertProps> = (props: NewToastAlertProps) => {
    let backHandler: NativeEventSubscription

    /*********
     * state
     *********/

    const [isVisible, setIsVisible] = useState<boolean>(true)
    const [duration, setDuration] = useState<number>(props.duration ? props.duration : 2000)
    const [animationType, setAnimationType] = useState<'fadeIn' | 'fadeOut'>('fadeIn')
    const opacity = useRef(new Animated.Value(0)).current

    /*************
     * life cycles
     *************/

    useEffect(() => {
        if (deviceInfo.isAndroid) {
            backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
                closeToastAlert()
                return true
            })
        }

        if (!props.isSnackBar) {
            const timeout = setTimeout(() => {
                closeToastAlert()
            }, duration)

            return () => {
                removeBackHandler()
                clearTimeout(timeout)
            }
        } else {
            setTimeout(closeToastAlert, 300)
            return () => {
                removeBackHandler()
            }
        }
    }, [animationType])

    /*************
     * function
     *************/

    const FadeIn = () => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: duration,
            useNativeDriver: true,
        }).start();
    }

    const FadeOut = () => {
        Animated.timing(opacity, {
            toValue: 0,
            duration: duration,
            useNativeDriver: true,
        }).start();
    }

    const closeToastAlert = () => {
        setIsVisible(false)
    }

    const removeBackHandler = () => {
        if (deviceInfo.isAndroid) {
            backHandler.remove()
        }
    }

    const getMarginBottom = () => {
        if (props.target) {
            if (props.target === 'bottomTab') {
                let marginBottom = 16 + 64
                if (deviceInfo.isIphoneX) marginBottom += 22
                return marginBottom
            }
        }
        if (props.hasBottomBtn) return deviceInfo.safeAreaBottomSpace + 60
        if (props.bottomMargin) return props?.bottomMargin
        if (props.tabVisible) return deviceInfo.safeAreaBottomSpace + 70
        if (deviceInfo.isIphoneX) return deviceInfo.safeAreaBottomSpace + 8
        if (deviceInfo.isAndroid) {
            return deviceInfo.androidExtraDimension.navigationBarHeight
        }

        return 16
    }

    const getBackgroundColor = () => {
        if (!props?.type) return BUColor['red']

        switch (props.type) {
            case 'complete':
                return AlertColor['alert-normal']
            case 'error':
                return AlertColor['alert-critical']
            case 'warning':
                return AlertColor['alert-minor']
            case 'normal':
                return BUColor['black']
        }
    }

    /*********
     * render
     *********/

    const renderContents = () => {
        if (props.isSnackBar) return renderSnackBar()
        return renderToastAlert()
    }

    const renderToastIcon = () => {
        if (props.type === 'complete') return <Ionicons name='checkmark-circle-outline' size={20} />
        else if (props.type === 'warning') return <Ionicons name='warning-outline' size={20} />
        else if (props.type === 'error') return <Ionicons name='close-circle-outline' size={20} />
        return <Ionicons name='information-circle-outline' size={20} />
    }

    const renderToastAlert = () => {
        return (
            <Row alignSelfCenter alignCenter radius100 pv8 pv16 bg={getBackgroundColor()} mb={getMarginBottom()}>
                {renderToastIcon()}
                <Span titleS ml8 semiBold color={props.type === 'warning' ? 'neutral-10' : 'neutral-100'}>{props?.message}</Span>
            </Row>
        )
    }

    const renderSnackBar = () => {
        const marginBottom = props.tabVisible ? 50 : deviceInfo.safeAreaBottomSpace + 10
        const snackBarLabel = props.snackBarBtnLabel ? props.snackBarBtnLabel : 'Confirm'

        return (
            <Row w={deviceInfo.size.width - 20} alignCenter justifyBetween alignSelfCenter radius5 pv6 ph16 mb={marginBottom} bgNeutral20 >
                <Span labelL colorNeutral100>{props?.message}</Span>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                        if (!props.snackBarAction) return

                        props.snackBarAction()
                        closeToastAlert()
                    }}
                    hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <Span labelL colorAlertCritical>{snackBarLabel}</Span>
                </TouchableOpacity>
            </Row>
        )
    }

    if (!isVisible) return null
    return (
        <Col w={deviceInfo.size.width} h={deviceInfo.size.height} bg={'transparent'} absolute justifyEnd
            onPress={closeToastAlert}>
            <Animated.View
                style={{ opacity }}>
                {renderContents()}
            </Animated.View>
        </Col>
    )
}


export default Toast
