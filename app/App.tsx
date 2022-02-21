import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Colors } from "react-native-ui-lib";
import AuthTab from "./src/components/navigations/tabs/AuthTab";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { store } from "@redux/store";

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
        <Provider store={store}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Group>
                            <Stack.Screen
                                options={{ headerShown: false }}
                                name="Auth"
                                component={AuthTab}
                            />
                        </Stack.Group>
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </Provider>
    );
}
