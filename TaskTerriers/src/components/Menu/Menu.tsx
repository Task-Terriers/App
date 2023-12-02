import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { ComponentStyle, IconType, TypographyType } from '../types'
import { ButtonComponentProps, UniversalButton, WarningButton } from '../Buttons'
import { NeutralColor, UniversalColorType } from '../../Libs'
import { Col, Row, Span } from '../../StyleToProps'


export interface MenuComponentProps {
    id?: number
    size?: 'small' | 'medium'
    title: string | TypographyType.Attr
    subTitle?: string | TypographyType.Attr
    description?: string | TypographyType.Attr
    subDescription?: string | TypographyType.Attr
    leftIconElement?: React.ReactElement
    rightIconElement?: React.ReactElement
    rightDetail?: string
    state?: ComponentStyle.State

    onPress?: () => void
    onLongPress?: () => void
    children?: JSX.Element
    button?: MenuButtonProps
    disable?: boolean
    disableOnlyEffect?: boolean
}

interface MenuButtonProps extends ButtonComponentProps {
    buttonType: 'warning' | 'universal'
}

const Menu: React.FC<MenuComponentProps> = ({
    size,
    title,
    subTitle,
    description,
    subDescription,
    leftIconElement,
    rightIconElement,
    state,
    onPress,
    onLongPress,
    children,
    button,
    disable,
    disableOnlyEffect,
    rightDetail,
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

    const renderLeftIcon = () => {
        if (leftIconElement) return leftIconElement
        return null
    }

    const renderRightIcon = () => {
        if (rightIconElement) return rightIconElement
        return null
    }

    const renderLeftSide = () => {
        return (
            <Row flexShrink alignCenter mr8>
                <Col>{(leftIconElement) && renderLeftIcon()}</Col>
                {renderTitleAndSubTitle()}
            </Row >
        )
    }

    const renderRightDetail = () => {
        if (rightDetail) {
            return (
                <Col mr={rightIconElement ? 12 : 0} justifyCenter>
                    <Span labelL numberOfLines={1} colorNeutral40 bold>{rightDetail.toString()}</Span>
                </Col>
            )
        }
    }

    const renderRightSide = () => {
        return (
            <Row flexShrink alignCenter mr8>
                <Col flexShrink>
                    {renderRightDetail()}
                </Col>
                {rightIconElement && renderRightIcon()}
            </Row >
        )
    }

    const renderTitleAndSubTitle = () => {
        return (
            <Col
                ml={leftIconElement ? 12 : 0}
                flexShrink
                flex
                justifyCenter
            >
                <Span labelL numberOfLines={1} color={disable ? 'neutral-40' : 'neutral-10'} bold>{title.toString()}</Span>
                {subTitle && (
                    <Span bodyM colorNeutral40>{subTitle.toString()}</Span>
                )}
            </Col>
        )
    }

    const renderButton = () => {
        if (children) return children
        if (!button) return null

        if (button?.buttonType == 'universal') {
            return (
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
            )
        } else {
            return (
                <WarningButton
                    size='small'
                    icon={button?.icon}
                    text={button?.text}
                    onPress={button?.onPress}
                    warningStyle='fill'
                />
            )

        }


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
                {rightIconElement || rightDetail ? renderRightSide() : renderButton()}
            </Row>
            {renderDescription()}
        </TouchableOpacity>
    )
}

export { Menu }
