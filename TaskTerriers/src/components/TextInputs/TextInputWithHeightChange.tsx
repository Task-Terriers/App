import React, { useEffect, useState } from 'react'
import { StyleSheet, TextStyle, View, ViewStyle, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { TextInputsProps } from '.'
import { deviceInfo } from '../../utilities/deviceInfo'
import { AlertColor, NeutralColor, extractMargin } from '../../Libs'
import { Col, Row, Span } from '../../StyleToProps'
import { Octicons } from '@expo/vector-icons'

interface TextInputWithHeightChangeProps extends TextInputsProps {
    initialHeight?: number
}
const TextInputWithHeightChange: React.FC<TextInputWithHeightChangeProps> = (props, ref) => {
    const validateCondition = (text: string) => {
        if (!isFirstLoading && required && !text.length) return false
        if (maxRange && Number(text) > maxRange) return false
        if (minRange && Number(text) < minRange) return false
        if (text.length > 0 && onValidationText?.(text)) return false
        return true
    }

    /***************
     * const, props
     ***************/

    const {
        maxCharacter,
        minCharacter,
        maxRange,
        minRange,
        required,
        placeholder,
        hideClearButton,
        hideLimitText,
        textAlignCenter,
        keyboardType,
        defaultValue,
        onSubmitEditing,
        autoFocus,
        returnKeyType,
        inputRef,
        onValidationText,
        margin,
        value,
        onPressClearButton,
        editable,
        initialHeight
    } = props

    const isFirstLoading: boolean = true

    /*********
     * state
     *********/

    const [currentText, setCurrentText] = useState<string>(defaultValue ? defaultValue : '')
    const [isValid, setIsValid] = useState<boolean>(validateCondition(currentText))
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const [height, setHeight] = useState<number>(initialHeight ? initialHeight : 140)
    /*************
     * life cycles
     *************/

    useEffect(() => {
        if (!!defaultValue?.length) setCurrentText(defaultValue)
    }, [defaultValue])

    /************
     * function
     ************/

    const setNewInputProps = () => {
        let newProps = { ...props }
        return newProps
    }

    const onChangeText = (text: string) => {
        const condition = validateCondition(text)
        setIsValid(condition)
        if (!condition) return
        if (props.maxCharacter < text.length) {
            setCurrentText(text.slice(0, maxCharacter))
            return
        }

        if (required && !text?.length) {
            setIsValid(false)
            if (props.onChangeText) props.onChangeText(text, condition)
            setCurrentText(text)
            return
        }

        if (props.onChangeText) props.onChangeText(text, condition)
        setCurrentText(text)
    }

    const clearText = () => {
        const condition = validateCondition('')
        setCurrentText('')
        setIsValid(condition)
        props.onChangeText?.('', condition)
        onPressClearButton?.()
    }

    /*********
     * render
     *********/


    const renderTextInput = () => {
        return (
            <TextInput
                editable={editable}
                value={value || currentText}
                placeholder={placeholder}
                placeholderTextColor={NeutralColor['neutral-60']}
                onChangeText={onChangeText}
                onFocus={e => setIsFocused(true)}
                onBlur={e => setIsFocused(false)}
                autoFocus={autoFocus}
                ref={inputRef}
                keyboardType={keyboardType}
                returnKeyType={returnKeyType}
                onSubmitEditing={onSubmitEditing}
                onContentSizeChange={currentText => {
                    setHeight(currentText.nativeEvent.contentSize.height)
                }}
                textAlignVertical={props.multiline && deviceInfo.isAndroid ? 'top' : 'auto'}
                style={[
                    styles.textInput,
                    textAlignCenter ? { textAlign: 'center', paddingHorizontal: 0 } : undefined,
                    props.style,
                    {
                        paddingVertical: 8,
                        paddingLeft: 16,
                        paddingRight: !hideClearButton && isFocused ? 8 : 16,
                        height: height < 100 ? height : Math.min(200, height),
                    },
                ]}
                {...setNewInputProps()}
            />
        )
    }

    const renderCharacterLimit = () => {
        if (!isFocused || !maxCharacter || hideLimitText || props.multiline || !props.editable) return null
        const hasClearButton = !!currentText.length
        const limitText = `${currentText.length || value.length}/${props.maxCharacter}`

        return (
            <Col bgAlertCritical pr={props?.multiline ? 16 : hasClearButton ? 8 : 12} mb20 h20
                style={{
                    justifyContent: props?.multiline ? 'flex-end' : 'center',
                }}>
                <Span bodyL colorNeutral40>{limitText}</Span>
            </Col>
        )
    }

    const renderMultilineCharacterLimit = () => {
        if (!isFocused || !maxCharacter || hideLimitText || !props.multiline || !props.editable) return null

        const hasClearButton = currentText.length === 0
        const limitText = `${currentText.length || value.length}/${props.maxCharacter}`

        return (
            <Col alignEnd pr={props?.multiline ? 16 : hasClearButton ? 8 : 12} mb10 h20>
                <Span bodyL colorNeutral40>{limitText}</Span>
            </Col>
        )
    }

    const renderClearButton = () => {
        if (!isFocused || !currentText.length || hideClearButton) return null
        return (
            <TouchableOpacity style={[styles.clearTextButton, { backgroundColor: props?.backgroundColor }]} onPress={clearText}>
                <Octicons name="x-circle" color={NeutralColor['neutral-50']} size={16} />
            </TouchableOpacity>
        )
    }

    const getOuterBorderColor = () => {
        if (!isValid) return 'rgba(255,68,56,0.3)'
        if (isFocused) return '#bcc4d8'
        return 'transparent'
    }

    const getInnerBorderColor = () => {
        if (!isValid) return AlertColor['alert-critical']
        if (isFocused) return NeutralColor['neutral-10']
        return NeutralColor['neutral-60']
    }

    return (
        <Col borderW4 radius16 mv10 borderColor={getOuterBorderColor()} style={extractMargin(margin)}>
            <Col radius12 borderColor={getInnerBorderColor()} borderW={isFocused ? 2 : 1} overflowHidden bg={editable ? NeutralColor['neutral-100'] : NeutralColor['neutral-90']}>
                <Row alignCenter pv={deviceInfo.isAndroid ? 0 : 10}>
                    {renderTextInput()}
                    {renderCharacterLimit()}
                    {renderClearButton()}
                </Row>
                {renderMultilineCharacterLimit()}
            </Col>
        </Col>
    )
}

const styles = StyleSheet.create({
    textInput: {
        flexGrow: 1,
        flexBasis: 1,
        color: '#131417',
        fontSize: 14,
        fontFamily: 'Pretendard-Regular',
        letterSpacing: 0.15,
    } as TextStyle,
    clearTextButton: {
        flexGrow: 1,
        paddingRight: 11,
        justifyContent: 'center',
    } as ViewStyle,
})

export { TextInputWithHeightChange }
