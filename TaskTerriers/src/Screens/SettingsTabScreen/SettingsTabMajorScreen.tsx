import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { IconNames } from '../../components/types'
import NavigationBar from '../../components/NavigationBar'
import { TaskTerriersNavigationModule } from '../../modules/NavigationModule'
import { BasicTextInput } from '../../components/TextInputs'
import { Col, Span } from '../../StyleToProps'
import { UniversalButton } from '../../components/Buttons'

interface Props { }


const SettingsTabMajorScreen = ({ navigation, route }) => {

    /*********
    * recoil
    *********/

    /**************************
    * props, navigation prams
    **************************/

    /*************
    * state, ref
    *************/

    const [isEditing, setIsEditing] = useState<boolean>(false)
    //need to set from what is from the db.
    const [majorInputText, setMajorInputText] = useState<string>('')
    const [minorInputText, setMinorInputText] = useState<string>('')

    /**************
    * life cycles
    **************/

    useEffect(() => {
        // ComponentDidMount

        // setIsRendering(false)
        return () => {
            // ComponentWillUnmount
        }
    }, [])

    /************
    * functions
    ************/
    const onPressReturn = () => {
        TaskTerriersNavigationModule.goBack()
    }

    /*********
    * render
    *********/

    const renderNavBar = () => {
        return <NavigationBar title={'Major/Minor'} iconName={IconNames['Return']} hasDivider iconAction={onPressReturn} />
    }

    const renderEditButton = () => {
        return (
            <UniversalButton text={{ value: !isEditing ? 'Edit' : 'Done' }} size='small' onPress={() => setIsEditing(!isEditing)} hasBorder />
        )
    }

    const renderMajorInput = () => {
        return (
            <Col mb20>
                <Span titleM mb10>Major</Span>
                <BasicTextInput
                    editable={isEditing}
                    maxCharacter={50}
                    size="small"
                    placeholder={'ex: Computer Science'}
                    onChangeText={(text: string) => setMajorInputText(text)}
                    value={majorInputText}
                />
            </Col>
        )
    }

    const renderMinorInput = () => {
        return (
            <Col>
                <Span titleM mb10>Minor</Span>
                <BasicTextInput
                    editable={isEditing}
                    maxCharacter={30}
                    size="small"
                    placeholder={'ex: Data Science'}
                    onChangeText={(text: string) => setMinorInputText(text)}
                    value={minorInputText}
                />
            </Col>
        )
    }

    /***********
    * render()
    ***********/

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            {renderNavBar()}
            <Col p16>
                <Col alignSelfEnd>
                    {renderEditButton()}
                </Col>
                {renderMajorInput()}
                {renderMinorInput()}
            </Col>
        </SafeAreaView>
    )

}
export default SettingsTabMajorScreen
