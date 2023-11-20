import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import TaskTerriersSafeAreaView from '../../Views/TaskTerriersSafeAreaView'
import NavigationBar from '../../components/NavigationBar'
import { BasicTextInput } from '../../components/TextInputs'
import { Col, Row, Span } from '../../StyleToProps'
import AsyncStorageModule from '../../modules/AsyncStorageModule'
import { NeutralColor } from '../../Libs'
import { Image } from 'expo-image'
import { UniversalButton } from '../../components/Buttons'
import { TaskTerriersNavigationModule } from '../../modules/NavigationModule'
import { Root } from '../../navigation/type'
import { deviceInfo } from '../../utilities/deviceInfo'

interface Props { }


const AuthAddProfileScreen = ({ navigation, route }) => {

    const firstName = route?.params?.firstName
    const lastName = route?.params?.lastName
    const email = route?.params?.email
    const [photoURL, setPhotoURL] = useState(route?.params?.photoURL)
    const [description, setDescription] = useState('')

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

    /**************
    * life cycles
    **************/

    useEffect(() => {
        console.log(route?.params)
        console.log(route?.params?.firstName)
    }, [])

    /************
    * functions
    ************/

    const onPressSaveButton = () => {
        return TaskTerriersNavigationModule.navigate(Root.BottomTabNavigation)
    }


    /*********
    * render
    *********/

    const renderNavigationBar = () => {
        return <NavigationBar title={"Add Profile"} />

    }

    const renderUserInfo = () => {
        return (
            <Col mt18>
                <Col mb10>
                    <Span labelL>First Name:</Span>
                    <BasicTextInput defaultValue={firstName} editable={false} backgroundColor={NeutralColor['neutral-70']} />
                </Col>
                <Col mb10>
                    <Span labelL>Last Name:</Span>
                    <BasicTextInput defaultValue={lastName} editable={false} backgroundColor={NeutralColor['neutral-70']} />
                </Col>
                <Col mb10>
                    <Span labelL>BU Email:</Span>
                    <BasicTextInput editable={false} defaultValue={email} backgroundColor={NeutralColor['neutral-70']} />
                </Col>
                <Col>
                    <Span labelL>Description</Span>
                    <BasicTextInput placeholder='Describe yourself!' value={description} onChangeText={setDescription} />
                </Col>
            </Col>
        )
    }


    const renderProfileURL = () => {
        return (
            <Col radius100 overflowHidden h120 w120 >
                <Image source={photoURL} style={{ height: 120 }} />
            </Col>
        )
    }

    const renderSaveButton = () => {
        return (
            <Col absolute bottom0 w={'100%'} ph16 pb={deviceInfo.safeAreaBottomSpace + 16}>
                <UniversalButton size='medium' onPress={onPressSaveButton} text={{ value: 'Save' }} backgroundColor={NeutralColor['neutral-100']} />
            </Col>
        )
    }
    /***********
    * render()
    ***********/

    return (
        <TaskTerriersSafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            {renderNavigationBar()}
            <Col alignCenter>
                {renderProfileURL()}
            </Col>
            <Col ph16>
                {renderUserInfo()}
            </Col>

            {renderSaveButton()}
        </TaskTerriersSafeAreaView>
    )

}

export default AuthAddProfileScreen
