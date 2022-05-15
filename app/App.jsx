import 'expo-dev-client';
import "react-native-gesture-handler";

import { AuthProvider } from "@contexts/authContext";
import { AppProvider } from "@contexts/appContext";
import Entypo from '@expo/vector-icons/Entypo';
import {
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    useFonts,
} from "@expo-google-fonts/montserrat";
import DispatcherNav from "@layout-navigations/DispatcherNav";
import * as SplashScreen from 'expo-splash-screen';
import React, {useCallback, useEffect, useState} from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Colors, Typography, View, Text } from "react-native-ui-lib";

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);

    let [fontsLoaded] = useFonts({
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

    useEffect(() => {
        async function prepare() {
            try {
                await SplashScreen.preventAutoHideAsync();
                
                if (fontsLoaded === true) {
                    setAppIsReady(true);

                    await SplashScreen.hideAsync();
                }

                // Simulate splash screen
                // await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }

        prepare();
    }, [fontsLoaded]);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady)
            await SplashScreen.hideAsync();
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <>
            {appIsReady === false ? (
                <View
                     style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                     onLayout={onLayoutRootView}>
                     <Text>SplashScreen Demo! 👋</Text>
                     <Entypo name="rocket" size={30} />
                 </View>  
            ) : (
                    <AuthProvider>
                        <AppProvider>
                            <SafeAreaProvider>
                                <DispatcherNav />
                            </SafeAreaProvider>
                        </AppProvider>
                    
                </AuthProvider>
             )} 
        </>
        
    );
}
