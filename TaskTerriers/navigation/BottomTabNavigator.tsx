import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RequestsTab from "../src/components/Screens/RequestsTab";
import ServicesTab from "../src/components/Screens/ServicesTab";
import MessagesTab from "../src/components/Screens/MessagesTab";
import SettingsTab from "../src/components/Screens/SettingsTab";
import { Col, Row, Span } from "../src/components/StyleToProps";
import { Ionicons } from '@expo/vector-icons';
import { BUColor, NeutralColor } from "../src/Libs/Colors";
import { TouchableOpacity } from "react-native";
import { toStyle } from "../src/components/StyleToProps/withStyleProps";
import { Style } from "../src/components/StyleToProps/styleProps";
import { deviceInfo } from "../src/utilities/deviceInfo";

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
    return (
        <Tab.Navigator
            tabBar={props => <CustomTabBarContent {...props} />}
            screenOptions={({ route }) => {
                return {
                    tabBarShowIcon: true,
                    tabBarShowLabel: false,
                };
            }}
        >
            <Tab.Screen name="Requests" component={RequestsTab} />
            <Tab.Screen name="Services" component={ServicesTab} />
            <Tab.Screen name="Messages" component={MessagesTab} />
            <Tab.Screen name="Settings" component={SettingsTab} />
        </Tab.Navigator>
    )
}

const CustomTabBarContent = ({ state, descriptors, navigation }) => {
    return (
        <Row h64 bgNeutral100 alignCenter ph16 mb={deviceInfo.buttonBottomSpace} borderTW={1} borderTColor={NeutralColor['neutral-90']}>
            {
                state.routes.map((route, index) => {
                    const isFocused = state.index === index
                    const { options } = descriptors[route.key];
                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    };
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
                                <Span color={isFocused ? BUColor['red'] : BUColor['black']} bold labelM>{route.name}</Span>
                            </Col>
                        </TouchableOpacity>
                    )
                })
            }
        </Row>
    )
}

const LocalTabBarIcon = (props: { focused: boolean; name: React.ComponentProps<any>['name'] }) => {
    switch (props.name) {
        case "Requests":
            if (props.focused) return <Ionicons name="help-buoy" size={24} color="#cc0000" />
            else return <Ionicons name="help-buoy-outline" size={24} color="#2D2926" />
        case "Services":
            if (props.focused) return <Ionicons name="construct" size={24} color="#cc0000" />
            else return <Ionicons name="construct-outline" size={24} color="#2D2926" />
        case "Messages":
            if (props.focused) return <Ionicons name="chatbox-ellipses" size={24} color="#cc0000" />
            else return <Ionicons name="chatbox-ellipses-outline" size={24} color="#2D2926" />
        case "Settings":
            if (props.focused) return <Ionicons name="settings-sharp" size={24} color="#cc0000" />
            else return <Ionicons name="settings-outline" size={24} color="#2D2926" />
        default:
            return null
    }
}
