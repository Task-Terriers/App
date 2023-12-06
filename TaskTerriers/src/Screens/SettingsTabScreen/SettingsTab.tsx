import React, { useState, useEffect } from 'react'
import { FlatList, ListRenderItemInfo } from 'react-native'
import Auth from '@react-native-firebase/auth'

import { TaskTerriersNavigationModule } from '../../modules/NavigationModule'
import { Col, Row } from '../../StyleToProps'
import { Menu, MenuComponentProps } from '../../components/Menu'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Divider } from '../../components/Divider'
import TaskTerriersSafeAreaView from '../../Views/TaskTerriersSafeAreaView'
import NavigationBar from '../../components/NavigationBar'
import { IconNames } from '../../components/types'
import AsyncStorageModule from '../../modules/AsyncStorageModule'
import { Root } from '../../navigation/type'
import { Image } from 'expo-image'
import { NeutralColor } from '../../Libs'
import { UniversalButton } from '../../components/Buttons'

type userData = {
  firstName: string
  lastName: string
  email: string
  photoURL: string
  userId: string
}

const SettingsTab = ({ navigation, route }) => {
  /*********
   * recoil
   *********/

  /**************************
   * const, props, navigation prams
   **************************/

  /*************
   * state, ref
   *************/

  const [isRendering, setIsRendering] = useState<boolean>(true)
  const [userData, setUserData] = useState<userData>()

  const SettingItems: MenuComponentProps[] = [
    {
      title: 'Email',
      leftIconElement: <MaterialIcons name="email" color={'black'} size={20} />,
      rightDetail: userData?.email,
    },
    {
      title: 'Name',
      leftIconElement: <Ionicons name="person" color={'black'} size={20} />,
      rightDetail: `${userData?.firstName} ${userData?.lastName}`,
    },
    //needs change for rightDetail. get it from db
    {
      title: 'Major/Minor',
      leftIconElement: <Ionicons name="briefcase" color={'black'} size={20} />,
      rightIconElement: <Ionicons name="chevron-forward" color={'black'} size={20} />,
      rightDetail: 'ComputerScience',
      onPress: () => TaskTerriersNavigationModule.navigate(Root.SettingsTabMajorScreen),
    },
    {
      title: 'Bio',
      leftIconElement: <Ionicons name="document-text-outline" color="black" size={20} />,
      rightIconElement: <Ionicons name="chevron-forward" color={'black'} size={20} />,
      onPress: () => TaskTerriersNavigationModule.navigate(Root.SettingsTabAboutScreen),
    },
    {
      title: 'Sign Out',
      leftIconElement: <Ionicons name="log-out" color={'black'} size={20} />,
      size: 'small',
      button: { size: 'small', onPress: () => onPressSignOut(), hasBorder: true, text: { value: 'Sign Out' }, buttonType: 'warning' },
    },
  ]

  /**************
   * life cycles
   **************/

  useEffect(() => {
    getUserData()
    console.log(userData)
  }, [])

  /************
   * functions
   ************/

  const onPressSignOut = () => {
    return Auth()
      .signOut()
      .then(() => {
        TaskTerriersNavigationModule.navigate('AuthLoginMainScreen'), console.log('User signed out!')
      })
  }

  const getUserData = async () => {
    const userData = await AsyncStorageModule.GET_asyncStorage('USER_DATA')
    setUserData(userData)
    setIsRendering(true)
  }

  /*********
   * render
   *********/

  //need to add case : when default profile disable remove button
  //need to add image picker
  const renderProfileSection = () => {
    return (
      <>
        <Col alignSelfCenter radius100 mr10 overflow="hidden" borderColor={NeutralColor['neutral-50']} borderW2>
          <Image contentFit="fill" source={require('../../assets/images/defaultProfile.jpeg')} style={{ width: 100, height: 100 }} />
        </Col>
        <Row justifyBetween w200 alignSelfCenter mt20>
          <UniversalButton size="small" text={{ value: 'Edit' }} onPress={null} hasBorder backgroundColor={NeutralColor['neutral-100']} />
          <UniversalButton size="small" text={{ value: 'Remove' }} onPress={null} hasBorder backgroundColor={NeutralColor['neutral-100']} />
        </Row>
      </>
    )
  }

  const renderItem = ({ item }: ListRenderItemInfo<MenuComponentProps>) => {
    return (
      <Col mb2>
        <Menu state={'enabled'} {...item} />
        {item.title != 'Sign Out' && <Divider />}
      </Col>
    )
  }

  const renderMenuList = () => {
    return (
      <FlatList
        scrollEnabled={false}
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16, paddingVertical: 16 }}
        data={SettingItems}
        keyExtractor={(item, index) => `setting-menu-${index}`}
        renderItem={renderItem}
      />
    )
  }

  /***********
   * render()
   ***********/

  return (
    <TaskTerriersSafeAreaView style={{ flex: 1 }}>
      <NavigationBar iconName={IconNames['Setting']} title={route.name} />
      {isRendering && (
        <>
          <Col mt20>{renderProfileSection()}</Col>
          <Col bgNeutral100 m16 radius12>
            {renderMenuList()}
          </Col>
        </>
      )}
    </TaskTerriersSafeAreaView>
  )
}

export default SettingsTab
