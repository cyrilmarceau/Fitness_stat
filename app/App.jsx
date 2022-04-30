import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Colors, Typography } from "react-native-ui-lib";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthProvider } from "@contexts/authContext";
import DispatcherNav from "@layout-navigations/DispatcherNav";
import AppLoading from "expo-app-loading";
import {
    useFonts,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

export default function App() {
    /* prettier-ignore */
    let [fontsLoaded] = useFonts({
        // "Montserrat": require("./assets/fonts/Montserrat-Bold.ttf"),
        // "Montserrat": require("./assets/fonts/Montserrat-Medium.ttf"),
        // "Montserrat": require("./assets/fonts/Montserrat-Regular.ttf"),
        // "Montserrat": require("./assets/fonts/Montserrat-SemiBold.ttf"),
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_600SemiBold,
        Montserrat_700Bold,
    });

    Colors.loadColors({
        primary: "#2980B9",
        secondary: "#E07A5F",
        error: "#FE5F55",
        background: "#efefef",
    });
    // #F2CC8F #F4F1DE #3D405B #81B29A

    Typography.loadTypographies({
        textB: { fontFamily: "Montserrat_700Bold" },
        textD: { fontFamily: "Montserrat_600SemiBold" },
        textR: { fontFamily: "Montserrat_400Regular" },
        h1: { fontSize: 40, fontWeight: "700", fontFamily: "Montserrat" },
        h2: { fontSize: 38, fontWeight: "700" },
        h3: { fontSize: 34, fontWeight: "600" },
        h4: { fontSize: 28, fontWeight: "400" },
        h5: { fontSize: 22, fontWeight: "400" },
        h6: { fontSize: 20, fontWeight: "400" },
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

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
