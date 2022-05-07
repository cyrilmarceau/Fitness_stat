import { screens } from "@layout-navigations/routes";
import ForgetPasswordStack from "@layout-navigations/stacks/auth/ForgetPasswordStack";
import AuthTab from "@layout-navigations/tabs/AuthTab";
import { createStackNavigator } from "@react-navigation/stack";
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
                name={screens.ForgetPasswordStack}
                component={ForgetPasswordStack}
            />
        </Stack.Navigator>
    );
};

export default AuthStack;
