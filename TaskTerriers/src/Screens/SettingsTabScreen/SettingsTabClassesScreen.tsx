import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import NavigationBar from '../../components/NavigationBar'
import { IconNames } from '../../components/types'
import { TaskTerriersNavigationModule } from '../../modules/NavigationModule'
import TaskTerriersSafeAreaView from '../../Views/TaskTerriersSafeAreaView'
import { FlatList } from 'react-native-gesture-handler'
import { UniversalButton } from '../../components/Buttons'
import { Col, Row, Span } from '../../StyleToProps'
import { BasicTextInput } from '../../components/TextInputs'
import { NeutralColor } from '../../Libs'
import { Divider } from '../../components/Divider'
import { Ionicons } from '@expo/vector-icons'

interface Props { }


const SettingsTabClassesScreen = ({ navigation, route }) => {

    /*********
    * recoil
    *********/

    /**************************
    * props, navigation prams
    **************************/

    /*************
    * state, ref
    *************/

    const [isRendering, setIsRendering] = useState<boolean>(true)
    const [isEditing, setIsEditing] = useState<boolean>(false)
    const [inputText, setInputText] = useState<string>('')
    const [classes, setClasses] = useState<string[]>()

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

    const onPressAddButton = () => {

    }

    /*********
    * render
    *********/

    const renderNavBar = () => {
        return <NavigationBar title={'Classes'} iconName={IconNames['Return']} hasDivider iconAction={onPressReturn} />
    }

    const renderEditButton = () => {
        return (
            <UniversalButton text={{ value: isEditing ? 'Done' : 'Edit' }} size='small' onPress={() => setIsEditing(!isEditing)} hasBorder />
        )
    }

    const renderAddButton = () => {
        return (
            <Col mt10 alignSelfEnd>
                <UniversalButton text={{ value: 'Add' }} size='small' onPress={null} hasBorder />
            </Col>
        )
    }

    const renderItem = () => {
        return (
            <Col>
                <Row bgNeutral100 ph12 pv10 radius12 justifyBetween>
                    <Span titleM>CAS CS412</Span>
                    <TouchableOpacity>
                        {isEditing && <Ionicons name='trash-outline' color='#ff0000' size={20} />}
                    </TouchableOpacity>
                </Row>
                <Divider />
            </Col>
        )

    }

    const renderTextInput = () => {
        // if (!isEditing) return null
        return (
            <BasicTextInput
                autoFocus
                maxCharacter={8}
                size="small"
                placeholder={'ex: CAS CS101'}
                onChangeText={(text: string) => setInputText(text)}
            />
        )
    }

    const renderClasses = () => {
        return (
            <FlatList
                data={classes}
                renderItem={renderItem}
                keyExtractor={item => item}

            />
        )
    }

    /***********
    * render()
    ***********/

    return (
        <TaskTerriersSafeAreaView style={{ flex: 1 }}>
            {renderNavBar()}
            <Col p16>
                <Col alignEnd >
                    {renderEditButton()}
                </Col>
                <Col bgNeutral100 p12 radius12 mt20>
                    {renderTextInput()}
                    {renderAddButton()}
                </Col>
                {renderItem()}
            </Col>
        </TaskTerriersSafeAreaView>
    )

}
export default SettingsTabClassesScreen
