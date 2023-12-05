import React, { useEffect, useState } from 'react'
import { StyleSheet, TextInput, TextStyle, View, ViewStyle } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { deviceInfo } from '../../utilities/deviceInfo'

import { Col, Row, Span } from '../../StyleToProps'
import { TEXT_INPUT_SIZE_MAP } from '../types'
import { AlertColor, NeutralColor, extractMargin } from '../../Libs'
import { TextInputsProps } from '.'
import { Ionicons, Octicons } from '@expo/vector-icons'

const BasicTextInput: React.FC<TextInputsProps> = (props, ref) => {
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
    required,
    placeholder,
    hideClearButton,
    hideLimitText,
    textAlignCenter,
    keyboardType,
    defaultValue,
    maxRange,
    minRange,
    onSubmitEditing,
    iconGroup,
    autoFocus,
    returnKeyType,
    inputRef,
    size,
    secureTextEntry = undefined,
    onValidationText,
    margin,
    value,
    onPressClearButton,
    customValidation,
    borderRadius,
  } = props

  /*********
   * state
   *********/

  const [currentText, setCurrentText] = useState<string>(defaultValue ? defaultValue : '')

  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [isFirstLoading, setIsFirstLoading] = useState<boolean>(true)
  const [isValid, setIsValid] = useState<boolean>(validateCondition(currentText))
  const [isSecureText, setIsSecureText] = useState<boolean>(secureTextEntry)
  const [selection, setSelection] = useState<{ start: number; end: number } | undefined>({ start: 0, end: 0 })

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
    delete newProps['required']
    delete newProps['size']
    delete newProps['maxCharacter']
    delete newProps['minCharacter']
    delete newProps['hideClearButton']
    delete newProps['hideLimitText']
    delete newProps['textAlignCenter']
    delete newProps['maxRange']
    delete newProps['minRange']
    delete newProps['iconGroup']
    delete newProps['accessibilityLabel']
    delete newProps['onValidationText']
    delete newProps['inputRef']
    delete newProps['margin']
    return newProps
  }

  const onFocus = () => {
    setIsFocused(true)
    setNewInputProps()?.onFocus?.()
    props?.onFocus?.()
    setSelection({ start: currentText.length, end: currentText.length })
    setTimeout(() => {
      setSelection(undefined)
    }, 0)
  }

  const onBlur = () => {
    setIsFocused(false)
    setNewInputProps()?.onBlur?.()
    setSelection({ start: 0, end: 0 })
  }

  const onChangeText = (text: string) => {
    const condition = validateCondition(text)
    setIsValid(condition)
    if (!condition && keyboardType === 'number-pad') return
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
    if (props.required) {
      setIsValid(false)
    } else {
      setIsValid(condition)
    }
    props.onChangeText?.('', condition)
    onPressClearButton?.()
  }

  /*********
   * render
   *********/

  const renderTextInput = () => {
    return (
      <TextInput
        {...setNewInputProps()}
        value={value || currentText}
        placeholder={placeholder}
        placeholderTextColor={NeutralColor['neutral-60']}
        scrollEnabled={props.multiline && isFocused ? true : false}
        selection={deviceInfo.isAndroid ? selection : undefined}
        onBlur={onBlur}
        onFocus={onFocus}
        onChangeText={onChangeText}
        autoFocus={autoFocus}
        ref={inputRef}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
        secureTextEntry={isSecureText}
        textAlignVertical={props.multiline && deviceInfo.isAndroid ? 'top' : 'auto'}
        style={[
          styles.textInput,
          textAlignCenter ? { textAlign: 'center', paddingHorizontal: 0 } : undefined,
          {
            minHeight: TEXT_INPUT_SIZE_MAP[size] || TEXT_INPUT_SIZE_MAP.medium,
            height: props.multiline ? undefined : TEXT_INPUT_SIZE_MAP[size] || TEXT_INPUT_SIZE_MAP.medium,
          },
          { paddingLeft: !!iconGroup?.length ? 0 : 16, paddingRight: !hideClearButton && isFocused ? 8 : 16 },
          { paddingVertical: deviceInfo.isAndroid ? 8 : undefined },
          props.style,
          props.multiline && maxCharacter
            ? {
              height: isFocused ? 100 : 126,
              marginBottom: isFocused ? 40 : 14,
            }
            : undefined,
        ]}
      />
    )
  }

  const renderCharacterLimit = () => {
    if (!isFocused || !maxCharacter || hideLimitText || props.multiline) return null

    const hasClearButton = !!currentText.length
    const limitText = `${currentText.length}/${props.maxCharacter}`

    return (
      <View
        style={{
          justifyContent: props?.multiline ? 'flex-end' : 'center',
          paddingRight: props?.multiline ? 16 : hasClearButton ? 8 : 12,
          backgroundColor: props?.backgroundColor,
          paddingBottom: props?.multiline ? 10 : undefined,
          height: props.style?.height && props.multiline ? '100%' : undefined,
        }}>
        <Span bodyL colorNeutral40>
          {limitText}
        </Span>
      </View>
    )
  }

  const renderMultilineCharacterLimit = () => {
    if (!isFocused || !maxCharacter || hideLimitText || !props.multiline) return null

    const hasClearButton = !!currentText.length
    const limitText = `${currentText.length}/${props.maxCharacter}`

    return (
      <View
        style={{
          alignItems: 'flex-end',
          paddingRight: props?.multiline ? 16 : hasClearButton ? 8 : 12,
          backgroundColor: props?.backgroundColor,
          paddingBottom: props?.multiline ? 10 : undefined,
          position: 'absolute',
          bottom: 0,
          right: 0,
        }}>
        <Span bodyL colorNeutral40>
          {limitText}
        </Span>{' '}
      </View>
    )
  }

  const renderClearButton = () => {
    if (!isFocused || !currentText.length || hideClearButton || secureTextEntry) return null

    return (
      <TouchableOpacity style={[styles.clearTextButton, { backgroundColor: props?.backgroundColor }]} onPress={clearText}>
        <Octicons name="x-circle" color={NeutralColor['neutral-50']} size={16} />
      </TouchableOpacity>
    )
  }

  const renderSecretViewButton = () => {
    if (!currentText.length || isSecureText === undefined) return null

    return (
      <TouchableOpacity style={styles.clearTextButton} onPress={() => setIsSecureText(!isSecureText)}>
        <Ionicons name={isSecureText ? 'eye' : 'eye-off'} color={NeutralColor['neutral-70']} />
      </TouchableOpacity>
    )
  }

  const getOuterBorderColor = () => {
    if (customValidation) return 'rgba(255,68,56,0.3)'
    if (!isValid) return 'rgba(255,68,56,0.3)'
    if (isFocused) return '#bcc4d8'
    return 'transparent'
  }

  const getInnerBorderColor = () => {
    if (customValidation) return AlertColor['alert-critical']
    if (!isValid) return AlertColor['alert-critical']
    if (isFocused) return NeutralColor['neutral-10']
    return NeutralColor['neutral-60']
  }

  return (
    <Col borderW4 mv10 borderColor={getOuterBorderColor()} radius={props.borderRadius ? borderRadius + 4 : 16} style={[extractMargin(margin)]}>
      <Col radius={props.borderRadius ? borderRadius : 12} borderColor={getInnerBorderColor()} borderW={isFocused ? 2 : 1} overflowHidden>
        <Row alignCenter>
          {renderTextInput()}
          {renderCharacterLimit()}
          {renderClearButton()}
          {renderSecretViewButton()}
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
    fontSize: 15,
    fontFamily: 'Pretendard-Regular',
    letterSpacing: 0.15,
  } as TextStyle,
  clearTextButton: {
    flexGrow: 1,
    paddingRight: 11,
    justifyContent: 'center',
  } as ViewStyle,
})

export { BasicTextInput }
