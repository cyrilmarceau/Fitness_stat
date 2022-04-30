import AuthTab from "@layout-navigations/tabs/AuthTab";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

const AuthStack = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name="Auth" component={AuthTab} />
        </Stack.Navigator>
    );
};

export default AuthStack;
