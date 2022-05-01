import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "@views-app/SettingsScreen";
import React from "react";

const DrawerStack = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="Meal" component={SettingsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default DrawerStack;
