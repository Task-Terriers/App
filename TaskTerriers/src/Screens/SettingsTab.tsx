import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, FlatList, ListRenderItemInfo } from 'react-native'
import auth from '@react-native-firebase/auth'

import TaskTerriersSafeAreaView from '../Views/TaskTerriersSafeAreaView'
import NavigationBar from '../components/NavigationBar'
import { IconNames } from '../components/types'
import { WarningButton } from '../components/Buttons'
import { TaskTerriersNavigationModule } from '../modules/NavigationModule'
import { Root } from '../navigation/type'
import MajorTags from '../components/Tags/MajorTags'
import { Col } from '../StyleToProps'
import { Menu, MenuComponentProps } from '../components/Menu'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Divider } from '../components/Divider'

interface Props { }

const SettingsTab = ({ navigation, route }) => {
  /*********
   * recoil
   *********/

  /**************************
   * const, props, navigation prams
   **************************/

  const SettingItems: MenuComponentProps[] = [
    {
      title: 'Email',
      iconElement: <MaterialIcons name='email' color={'black'} size={20} />
    },
    {
      title: 'Name',
      iconElement: <Ionicons name='person' color={'black'} size={20} />,
    },
    {
      title: 'Major',
      iconElement: <Ionicons name='briefcase' color={'black'} size={20} />,
      onPress: null,
    },
    {
      title: 'Minor',
      iconElement: <Ionicons name='book' color={'black'} size={20} />,
      onPress: null,
    },
    {
      title: 'Classes',
      iconElement: <MaterialIcons name='class' color={'black'} size={20} />,
      onPress: null,
    },
    {
      title: 'Sign Out',
      iconElement: <Ionicons name='log-out' color={'black'} size={20} />,
      onPress: () => onPressSignOut()
    },
  ]


  /*************
   * state, ref
   *************/

  const [isRendering, setIsRendering] = useState<boolean>(true)

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

  const onPressSignOut = () => {
    return auth()
      .signOut()
      .then(() => {
        TaskTerriersNavigationModule.navigate('AuthLoginMainScreen'), console.log('User signed out!')
      })
  }

  /*********
   * render
   *********/

  const renderItem = ({ item }: ListRenderItemInfo<MenuComponentProps>) => {
    return (
      <Col mb2>
        <Menu state={'enabled'} {...item} />
        <Divider />
      </Col>
    )
  }

  const renderMenuList = () => {
    return (
      <FlatList
        scrollEnabled={false}
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16, paddingTop: 16 }}
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
      <Col bgNeutral100 m16 radius12 p16>
        {renderMenuList()}
      </Col>
    </TaskTerriersSafeAreaView>
  )
}

export default SettingsTab
