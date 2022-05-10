import { routes, screens } from "@layout-navigations/routes";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "@views-app/menu/SettingsScreen";
import MyAccountScreen from "@views-app/menu/MyAccountScreen";
import AboutScreen from "@views-app/menu/AboutScreen";
import ProfilPictureScreen from "@views-app/menu/ProfilPictureScreen";
import React from "react";

const DrawerStack = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name={screens.Settings} component={SettingsScreen} />
            <Stack.Screen name={screens.Account} component={MyAccountScreen} />
            <Stack.Screen name={screens.About} component={AboutScreen} />
            <Stack.Screen name={screens.ProfilPicture} component={ProfilPictureScreen} />
        </Stack.Navigator>
    );
};

export default DrawerStack;
