import React, { useState, useEffect } from 'react'
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin'
import Auth from '@react-native-firebase/auth'

import TaskTerriersSafeAreaView from '../../Views/TaskTerriersSafeAreaView'
import { Col } from '../../StyleToProps'
import { Image } from 'expo-image'
import { TaskTerriersNavigationModule } from '../../modules/NavigationModule'
import { Root } from '../../navigation/type'
import AsyncStorageModule from '../../modules/AsyncStorageModule'

interface Props {}

const AuthLoginMainScreen = () => {
  const { currentUser } = Auth()

  /**************************
   * props, navigation prams
   **************************/

  /*************
   * state, ref
   *************/

  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()
  const baseApiUrl = process.env.EXPO_PUBLIC_API_URL

  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    forceCodeForRefreshToken: true,
  })

  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['
  /**************
   * life cycles
   **************/

  useEffect(() => {
    const subscriber = Auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber // unsubscribe on unmount
  }, [])

  /*************
   * life cycles
   *************/

  useEffect(() => {
    if (currentUser) {
      const userData = {
        firstName: parseName().firstName,
        lastName: parseName().lastName,
        email: currentUser.email,
        photoURL: currentUser.photoURL,
        userId: currentUser.uid,
      }
      if (userData.email.split('@').pop() === 'bu.edu') {
        if (!GET_User_info_from_DB(userData?.userId)) {
          console.log('exists???', POST_User(userData))
        }
        AsyncStorageModule.SET_asyncStorage('USER_DATA', JSON.stringify(userData))
        TaskTerriersNavigationModule.navigate(Root.BottomTabNavigation)
      } else {
        Auth()
          .signOut()
          .then(() => {
            TaskTerriersNavigationModule.navigate('AuthLoginMainScreen'), console.log('User signed out!')
          })
      }
    }
  }, [user])

  /*************
   * life cycles
   *************/

  /************
   * functions
   ************/
  const GET_User_info_from_DB = async (userId: string) => {
    try {
      const response = await fetch(`${baseApiUrl}/api/userExists/${userId}`)
      const result = await response.json()
      return result?.exists
    } catch (error) {
      console.log(error)
    }
  }

  const POST_User = async userData => {
    const body = {
      id: userData?.userId,
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      email: userData?.email,
    }
    try {
      const response = await fetch(`${baseApiUrl}/api/userAdd`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      const result = await response.json()
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  const onGoogleButtonPress = async () => {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
      // Get the users ID token
      const userInfo = await GoogleSignin.signIn()
      const googleCredential = Auth.GoogleAuthProvider.credential(userInfo.idToken)

      Auth().signInWithCredential(googleCredential)
      const { currentUser } = Auth()
      console.log('currentUser:', currentUser)
    } catch (error) {
      console.log(error)
      await GoogleSignin.signOut()
    } finally {
    }
  }

  // Handle user state changes
  const onAuthStateChanged = user => {
    setUser(user)
    console.log(user)
    if (initializing) setInitializing(false)
  }

  const parseName = () => {
    if (currentUser) {
      const displayName = currentUser?.displayName.split(' ')
      return { firstName: displayName[0], lastName: displayName[1] }
    }
  }

  /*********
   * render
   *********/

  const renderLogo = () => {
    return (
      <Col alignCenter mb30>
        <Image contentFit="contain" source={require('../../assets/images/logo/TaskTerriersLogoRed.png')} style={{ width: '100%', height: 97 }} />
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
