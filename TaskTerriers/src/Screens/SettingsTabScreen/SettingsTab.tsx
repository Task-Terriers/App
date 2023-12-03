import React, { useState, useEffect } from 'react'
import { FlatList, ListRenderItemInfo } from 'react-native'
import auth from '@react-native-firebase/auth'

import { TaskTerriersNavigationModule } from '../../modules/NavigationModule'
import { Col } from '../../StyleToProps'
import { Menu, MenuComponentProps } from '../../components/Menu'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Divider } from '../../components/Divider'
import TaskTerriersSafeAreaView from '../../Views/TaskTerriersSafeAreaView'
import NavigationBar from '../../components/NavigationBar'
import { IconNames } from '../../components/types'
import AsyncStorageModule from '../../modules/AsyncStorageModule'
import { Root } from '../../navigation/type'


type userData = {
  firstName: string
  lastName: string,
  email: string,
  photoURL: string,
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
      leftIconElement: <MaterialIcons name='email' color={'black'} size={20} />,
      rightDetail: userData?.email
    },
    {
      title: 'Name',
      leftIconElement: <Ionicons name='person' color={'black'} size={20} />,
      rightDetail: `${userData?.firstName} ${userData?.lastName}`
    },
    //needs change for rightDetail. get it from db
    {
      title: 'Major',
      leftIconElement: <Ionicons name='briefcase' color={'black'} size={20} />,
      rightIconElement: <Ionicons name='chevron-forward' color={'black'} size={20} />,
      rightDetail: 'ComputerScience',
      onPress: null,
    },
    //needs change for rightDetail. get it from db
    {
      title: 'Minor',
      leftIconElement: <Ionicons name='book' color={'black'} size={20} />,
      rightIconElement: <Ionicons name='chevron-forward' color={'black'} size={20} />,
      rightDetail: 'Visual Arts',
      onPress: null,
    },
    {
      title: 'Classes',
      leftIconElement: <MaterialIcons name='class' color={'black'} size={20} />,
      rightIconElement: <Ionicons name='chevron-forward' color={'black'} size={20} />,
      onPress: () => TaskTerriersNavigationModule.navigate(Root.SettingsTabClassesScreen),
    },
    {
      title: 'Sign Out',
      leftIconElement: <Ionicons name='log-out' color={'black'} size={20} />,
      onPress: () => onPressSignOut(),
      size: 'small',
      button: { size: 'small', onPress: null, hasBorder: true, text: { value: 'Sign Out' }, buttonType: 'warning' }
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
    return auth()
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
    <TaskTerriersSafeAreaView style={{ flex: 1, }}>
      <NavigationBar iconName={IconNames['Setting']} title={route.name} />
      {isRendering &&
        <Col bgNeutral100 m16 radius12 >
          {renderMenuList()}
        </Col>
      }
    </TaskTerriersSafeAreaView>
  )
}

export default SettingsTab
