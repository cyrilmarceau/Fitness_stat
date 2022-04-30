import { View, Text } from "react-native";
import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import AppStack from "./AppStack";
import MyAccountScreen from "@views-app/MyAccountScreen";
import SettingsScreen from "@views-app/SettingsScreen";

const RootStack = () => {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={AppStack} options={{ headerShown: false }} />
            <Drawer.Screen name="Account" component={MyAccountScreen} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
        </Drawer.Navigator>
    );
};

export default RootStack;
