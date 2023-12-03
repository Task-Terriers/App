import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import RequestsTab from '../Screens/RequestsTab'
import ServicesTab from '../Screens/ServicesTab'
import MessagesTab from '../Screens/MessagesTab'
import SettingsTab from '../Screens/SettingsTabScreen/SettingsTab'
import { Col, Row, Span } from '../StyleToProps'
import { Ionicons } from '@expo/vector-icons'
import { BUColor, NeutralColor } from '../Libs/Colors'
import { TouchableOpacity } from 'react-native'
import { toStyle } from '../StyleToProps/withStyleProps'
import { Style } from '../StyleToProps/styleProps'
import { deviceInfo } from '../utilities/deviceInfo'

const Tab = createBottomTabNavigator()

export const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBarContent {...props} />}
      screenOptions={() => {
        return {
          tabBarShowIcon: true,
          tabBarShowLabel: false,
          headerShown: false,
        }
      }}>
      {/* <Tab.Screen name="Requests" component={RequestsTab} /> */}
      <Tab.Screen name="Services" component={ServicesTab} />
      <Tab.Screen name="Messages" component={MessagesTab} />
      <Tab.Screen name="Settings" component={SettingsTab} />
    </Tab.Navigator>
  )
}

const CustomTabBarContent = ({ state, descriptors, navigation }) => {
  return (
    <Row
      h={64 + deviceInfo.buttonBottomSpace}
      bgNeutral100
      alignCenter
      ph16
      pb={deviceInfo.buttonBottomSpace}
      borderTW={1}
      borderTColor={NeutralColor['neutral-80']}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index
        const { options } = descriptors[route.key]
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }
        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={toStyle(<Style flex justifyCenter alignCenter />)}>
            <Col alignCenter justifyCenter style={{ top: 10, marginBottom: 10 }}>
              <LocalTabBarIcon focused={isFocused} name={route.name} />
              <Span color={isFocused ? BUColor['red'] : BUColor['black']} bold labelM>
                {route.name}
              </Span>
            </Col>
          </TouchableOpacity>
        )
      })}
    </Row>
  )
}

const LocalTabBarIcon = (props: { focused: boolean; name: React.ComponentProps<any>['name'] }) => {
  switch (props.name) {
    case 'Requests':
      if (props.focused) return <Ionicons name="help-buoy" size={24} color="#cc0000" />
      else return <Ionicons name="help-buoy-outline" size={24} color="#2D2926" />
    case 'Services':
      if (props.focused) return <Ionicons name="construct" size={24} color="#cc0000" />
      else return <Ionicons name="construct-outline" size={24} color="#2D2926" />
    case 'Messages':
      if (props.focused) return <Ionicons name="chatbox-ellipses" size={24} color="#cc0000" />
      else return <Ionicons name="chatbox-ellipses-outline" size={24} color="#2D2926" />
    case 'Settings':
      if (props.focused) return <Ionicons name="settings-sharp" size={24} color="#cc0000" />
      else return <Ionicons name="settings-outline" size={24} color="#2D2926" />
    default:
      return null
  }
}
