import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native-ui-lib";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="dark" />
            <View paddingH-30>{children}</View>
        </SafeAreaView>
    );
};

export default BaseLayout;
