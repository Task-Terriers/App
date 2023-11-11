import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RequestsTab from "../src/components/Screens/RequestsTab";
import ServicesTab from "../src/components/Screens/ServicesTab";
import MessagesTab from "../src/components/Screens/MessagesTab";
import SettingsTab from "../src/components/Screens/SettingsTab";

const BottomTab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <BottomTab.Navigator>
            <BottomTab.Screen name="Requests" component={RequestsTab} />
            <BottomTab.Screen name="Services" component={ServicesTab} />
            <BottomTab.Screen name="Messages" component={MessagesTab} />
            <BottomTab.Screen name="Settings" component={SettingsTab} />
        </BottomTab.Navigator>
    )
}

export default BottomTabs