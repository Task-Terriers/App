import React, { useState, useEffect, useReducer, useMemo } from 'react'
import Auth from '@react-native-firebase/auth'
import AsyncStorageModule from '../modules/AsyncStorageModule'
import RootStack from './RootStack'
import AuthStack from './AuthStack'
import { NavigationContainer } from '@react-navigation/native'
import { TaskTerriersNavigationRef } from '../modules/NavigationModule'

export type userData = {
  firstName: string
  lastName: string
  email: string
  photoURL: string
  userId: string
}
const AuthContext = React.createContext(null)

const Navigation = () => {
  const { currentUser } = Auth()

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
    if (currentUser) {
      const userData = {
        firstName: parseName().firstName,
        lastName: parseName().lastName,
        email: currentUser.email,
        photoURL: currentUser.photoURL,
        userId: currentUser.uid
      }
      console.log(userData.email)
      if (userData.email.split('@').pop() === 'bu.edu') {
        authContext.hasAuth()
        AsyncStorageModule.SET_asyncStorage('USER_DATA', JSON.stringify(userData))
      } else {
        authContext.hasNotAuth()
      }
    }
  }, [])

  /************
   * functions
   ************/

  const parseName = () => {
    if (currentUser) {
      const displayName = currentUser?.displayName.split(' ')
      return { firstName: displayName[0], lastName: displayName[1] }
    }
  }

  const authContext = useMemo(
    () => ({
      hasAuth: () => dispatch({ type: 'HAS_AUTH' }),
      hasNotAuth: async () => dispatch({ type: 'HAS_NOT_AUTH' }),
    }),
    [],
  )

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'HAS_AUTH':
          return {
            isLoading: false,
            hasAuth: true,
          }
        case 'HAS_NOT_AUTH':
          return {
            isLoading: false,
            hasAuth: false,
          }
      }
    },
    {
      isLoading: true,
      hasAuth: false,
    },
  )

  /*********
   * render
   *********/

  // if (isRendering === true) {
  // return null
  // }

  /***********
   * render()
   ***********/

  return (
    <NavigationContainer ref={TaskTerriersNavigationRef}>
      <AuthContext.Provider value={authContext}>
        {state.hasAuth ? <RootStack /> : <AuthStack />}
      </AuthContext.Provider>
    </NavigationContainer>
  )
}
export default Navigation
