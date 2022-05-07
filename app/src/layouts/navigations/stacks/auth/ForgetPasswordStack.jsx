import { screens } from "@layout-navigations/routes";
import { createStackNavigator } from "@react-navigation/stack";
import ForgetPassword from "@views-auth/ForgetPassword";
import ForgetPasswordEmailSendScreen from "@views-auth/ForgetPasswordEmailSendScreen";

import React from "react";

const ForgetPasswordStack = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={screens.ForgetPassword} component={ForgetPassword} />
            <Stack.Screen
                name={screens.ForgetPasswordEmailSend}
                component={ForgetPasswordEmailSendScreen}
            />
        </Stack.Navigator>
    );
};

export default ForgetPasswordStack;
