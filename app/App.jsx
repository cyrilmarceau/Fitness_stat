import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Colors } from "react-native-ui-lib";

import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider } from "@contexts/authContext";
import DispatcherNav from "@layout-navigations/DispatcherNav";

export default function App() {
    Colors.loadColors({
        primary: "#2980B9",
        primaryLight: "#E0FBFC",
        primaryExtraLight: "#C2DFE3",
        secondary: "#F0B67F",
        error: "#FE5F55",
    });

    const Stack = createStackNavigator();

    return (
        <AuthProvider>
            <SafeAreaProvider>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Group>
                            <Stack.Screen
                                options={{ headerShown: false }}
                                name="Dispatcher"
                                component={DispatcherNav}
                            />
                        </Stack.Group>
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </AuthProvider>
    );
}
