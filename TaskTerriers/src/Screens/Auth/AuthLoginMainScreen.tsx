import React, { useState, useEffect } from 'react'
import TaskTerriersSafeAreaView from '../../Views/TaskTerriersSafeAreaView'
import { UniversalButton } from '../../components/Buttons'
import * as Google from "expo-auth-session/providers/google"
import { Col } from '../../StyleToProps'
import { Image } from 'expo-image'


interface Props { }


const AuthLoginMainScreen = () => {

    /**************************
    * props, navigation prams
    **************************/

    /*************
    * state, ref
    *************/

    const androidClientID = process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID
    const iosClientID = process.env.EXPO_PUBLIC_IOS_CLIENT_ID

    const [userInfo, setUserInfo] = useState(null)
    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: iosClientID,
        androidClientId: androidClientID
    })

    const blurhash =
        '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
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

    /*********
    * render
    *********/

    const renderLogo = () => {
        return (
            <Col alignCenter mb30>
                <Image contentFit='contain' source={require('../../assets/images/logo/TaskTerriersLogoRed.png')} style={{ width: '100%', height: 97 }} />
            </Col>
        )
    }

    const renderGoogleSignIn = () => {
        return (
            <UniversalButton size='medium' text={{ value: 'Sign in With Google' }} onPress={() => promptAsync()} />
        )
    }

    /***********
    * render()
    ***********/

    return (
        <TaskTerriersSafeAreaView style={{ backgroundColor: 'white' }}>
            <Col flex justifyCenter ph34>
                {renderLogo()}
                {renderGoogleSignIn()}
            </Col>
        </TaskTerriersSafeAreaView>
    )

}

export default AuthLoginMainScreen
