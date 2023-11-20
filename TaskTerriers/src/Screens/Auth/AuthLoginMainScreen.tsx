import React, { useState, useEffect } from 'react'
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import initializeApp from "@react-native-firebase/app";
import auth, { firebase } from '@react-native-firebase/auth';

import TaskTerriersSafeAreaView from '../../Views/TaskTerriersSafeAreaView'
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

    const [userInfo, setUserInfo] = useState(null)

    GoogleSignin.configure({
        webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
        forceCodeForRefreshToken: true,
    });

    const blurhash =
        '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
    /**************
    * life cycles
    **************/
    /*************
    * life cycles
    *************/


    useEffect(() => {

    }, [])

    /*************
    * life cycles
    *************/

    /************
    * functions
    ************/
    const onGoogleButtonPress = async () => {
        try {
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // Get the users ID token
            const userInfo = await GoogleSignin.signIn();
            // setUserInfo(userInfo)
            const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
            // console.log(userInfo)
            // console.log(googleCredential)

            auth().signInWithCredential(googleCredential)
            const { currentUser } = auth()
            console.log('currentUser:', currentUser)
        } catch (error) {
            console.log("Thisss: ", error)
            await GoogleSignin.signOut()
        } finally {

        }

        // Create a Google credential with the token
        // const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // // Sign-in the user with the credential
        // // return auth().signInWithCredential(googleCredential);
        // const userSignIn = auth().signInWithCredential(googleCredential)
        // userSignIn.then((user) => {
        //     console.log(user)
        // }).catch((error) => {
        //     console.log(error)
        // })
    }


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
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={onGoogleButtonPress}
            // disabled={this.state.isSigninInProgress}
            />
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
