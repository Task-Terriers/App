import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RequestsTab from "../src/components/Screens/RequestsTab";
import ServicesTab from "../src/components/Screens/ServicesTab";
import MessagesTab from "../src/components/Screens/MessagesTab";
import SettingsTab from "../src/components/Screens/SettingsTab";

const Tab = createBottomTabNavigator();

function BottomTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Requests" component={RequestsTab} />
            <Tab.Screen name="Services" component={ServicesTab} />
            <Tab.Screen name="Messages" component={MessagesTab} />
            <Tab.Screen name="Settings" component={SettingsTab} />
        </Tab.Navigator>
    )
}

export default BottomTabs