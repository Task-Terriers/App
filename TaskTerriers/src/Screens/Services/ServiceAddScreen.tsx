import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import NavigationBar from '../../components/NavigationBar'
import TaskTerriersSafeAreaView from '../../Views/TaskTerriersSafeAreaView'
import { IconNames } from '../../components/types'
import { TaskTerriersNavigationModule } from '../../modules/NavigationModule'
import { Col, Span } from '../../StyleToProps'
import { BasicTextInput, TextInputWithHeightChange } from '../../components/TextInputs'

interface Props { }

// profilePicture?: string
// serviceName?: string
// shortServiceDescription: string
// aboutServiceProvider: string
// coursesTaken?: string[]
// major?: string
// minor?: string
// displayMajor: boolean

const ServiceAddScreen = ({ navigation, route }) => {

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
    const [serviceNameText, setServiceNameText] = useState<string>('')
    const [aboutText, setAboutText] = useState<string>('')
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
        return <NavigationBar title={'Add New Service'} iconName={IconNames['Return']} hasDivider iconAction={onPressReturn} />
    }

    const renderInputs = () => {
        return (
            <Col>
                <Span titleM mb10>Service Name</Span>
                <BasicTextInput
                    autoFocus
                    maxCharacter={20}
                    size="small"
                    placeholder={'ex: CS112 tutoring'}
                    onChangeText={(text: string) => setServiceNameText(text)}
                    value={serviceNameText}
                />
                <Span titleM mt20 mb10>Short Service Description</Span>
                <BasicTextInput
                    size='small'
                    maxCharacter={30}
                    placeholder={'ex: Best Tutor Ever'}
                    onChangeText={(text: string) => setAboutText(text)}
                    value={aboutText}
                />

                <Span titleM mt20 mb10>About</Span>
                <TextInputWithHeightChange
                    editable
                    placeholder={'ex: explain about yourself'}
                    onChangeText={(text: string) => setAboutText(text)}
                    value={aboutText}
                    multiline
                    hideClearButton={false}
                />
            </Col>
        )
    }



    /***********
    * render()
    ***********/

    return (
        <TaskTerriersSafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            {renderNavBar()}
            <Col p16>
                {renderInputs()}
            </Col>
        </TaskTerriersSafeAreaView>
    )

}


const styles = StyleSheet.create({
})

export default ServiceAddScreen
