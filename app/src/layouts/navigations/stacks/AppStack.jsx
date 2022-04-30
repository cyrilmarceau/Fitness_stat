import AppTab from "@layout-navigations/tabs/AppTab";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

const AppStack = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={AppTab} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default AppStack;
