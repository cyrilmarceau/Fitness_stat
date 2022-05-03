import AuthTab from "@layout-navigations/tabs/AuthTab";
import { routes, screens } from "@layout-navigations/routes";
import { createStackNavigator } from "@react-navigation/stack";
import ForgetPassword from "@views-auth/ForgetPassword";
import React from "react";

const AuthStack = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="AuthTab" component={AuthTab} />
            <Stack.Screen
                options={{
                    presentation: "modal",
                }}
                name={screens.ForgetPassword}
                component={ForgetPassword}
            />
        </Stack.Navigator>
    );
};

export default AuthStack;
