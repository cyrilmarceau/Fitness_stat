import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "@views-app/SettingsScreen";
import MyAccountScreen from "@views-app/MyAccountScreen";
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
        </Stack.Navigator>
    );
};

export default DrawerStack;