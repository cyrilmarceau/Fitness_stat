import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "@views-app/menu/SettingsScreen";
import MyAccountScreen from "@views-app/menu/MyAccountScreen";
import AboutScreen from "@views-app/menu/AboutScreen";
import React from "react";

const DrawerStack = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
            <Stack.Screen name="AccountScreen" component={MyAccountScreen} />
            <Stack.Screen name="AboutScreen" component={AboutScreen} />
        </Stack.Navigator>
    );
};

export default DrawerStack;
