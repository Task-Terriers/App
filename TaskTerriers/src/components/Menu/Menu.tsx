import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { ComponentStyle, IconType, TypographyType } from '../types'
import { ButtonComponentProps, UniversalButton } from '../Buttons'
import { NeutralColor, UniversalColorType } from '../../Libs'
import { Col, Row, Span } from '../../StyleToProps'


export interface MenuComponentProps {
    id?: number
    size?: 'small' | 'medium'
    title: string | TypographyType.Attr
    subTitle?: string | TypographyType.Attr
    description?: string | TypographyType.Attr
    subDescription?: string | TypographyType.Attr

    icon?: IconType.Attr
    iconElement?: React.ReactElement
    state?: ComponentStyle.State

    onPress?: () => void
    onLongPress?: () => void
    children?: JSX.Element
    button?: MenuButtonProps
    disable?: boolean
    disableOnlyEffect?: boolean
    hasNewBadge?: boolean
}

interface MenuButtonProps extends ButtonComponentProps {
    overwriteColor?: UniversalColorType.Value
    overwriteBackgroundColor?: UniversalColorType.Value
}

const Menu: React.FC<MenuComponentProps> = ({
    size,
    title,
    subTitle,
    description,
    subDescription,
    icon,
    iconElement,
    state,
    onPress,
    onLongPress,
    children,
    button,
    disable,
    disableOnlyEffect,
    hasNewBadge,
}) => {
    /************
     * function
     ************/

    const getBackgroundColor = () => {
        if (button?.overwriteBackgroundColor === 'transparent') return 'transparent'
        if (!state) return NeutralColor['neutral-100']
        if (state === 'selected') return NeutralColor['neutral-90']
    }

    /*********
     * render
     *********/

    const renderIcon = () => {
        if (icon?.src) {
            return (
                <Col>
                    {/* <CImage src={icon.src} size={icon?.size || { width: 24, height: 24 }} /> */}
                </Col>
            )
        } else if (iconElement) return iconElement
        return null
    }

    const renderLeftSide = () => {
        return (
            <View style={{ flexDirection: 'row', flexShrink: 1, alignItems: 'center', marginRight: 8 }}>
                <View>{(!icon?.position || icon?.position === 'left') && renderIcon()}</View>
                {renderTitleAndSubTitle()}
            </View>
        )
    }

    const renderTitleAndSubTitle = () => {
        return (
            <View
                style={{
                    marginLeft: icon?.src && icon?.position !== 'right' ? 12 : 0,
                    flexShrink: 1,
                    flex: 1,
                    justifyContent: 'center',
                }}>
                <Span labelL numberOfLines={1} color={disable ? 'neutral-40' : 'neutral-10'} bold>{title.toString()}</Span>
                {subTitle && (
                    <Span bodyM colorNeutral40>{subTitle.toString()}</Span>
                )}
            </View>
        )
    }

    const renderButton = () => {
        if (children) return children
        if (icon?.position === 'right') return renderIcon()

        if (!button) return null

        return (
            <View>
                <UniversalButton
                    size="small"
                    icon={button?.icon}
                    text={button?.text}
                    hasBorder={!!button?.text?.value?.length}
                    onPress={button?.onPress}
                    overwriteColor={button?.overwriteColor}
                    overwriteBackgroundColor={button?.overwriteBackgroundColor}
                    state={button?.state}
                />
            </View>
        )
    }

    const renderDescription = () => {
        if (!description) return null
        return (
            <Row>
                <Col>
                    <Span bodyM colorNeutral40 bold mt8 numberOfLines={1}>{description.toString()}</Span>
                    {subDescription && (
                        <Span bodyM colorNeutral40 bold mt4>{subDescription.toString()}</Span>
                    )}
                </Col>
                <View style={{ opacity: 0 }}>{renderButton()}</View>
            </Row>
        )
    }

    const getPaddingVertical = () => {
        if (size) return 0
        if (subTitle && !description) return 16
        return 12
    }

    const getMinHeight = () => {
        if (!size) return undefined
        if (size === 'small') return 48
        if (size === 'medium') return 72
    }

    return (
        <TouchableOpacity
            disabled={disable || disableOnlyEffect || !!button?.text?.value?.length}
            onLongPress={onLongPress}
            onPress={onPress}
            style={{ backgroundColor: getBackgroundColor(), flexShrink: 1, paddingHorizontal: 12, paddingVertical: getPaddingVertical(), justifyContent: 'center' }}
        >
            <Row h={getMinHeight()} justifyBetween alignCenter>
                {renderLeftSide()}
                {renderButton()}
            </Row>
            {renderDescription()}
        </TouchableOpacity>
    )
}

export { Menu }
