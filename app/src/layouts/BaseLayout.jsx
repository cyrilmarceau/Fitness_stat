import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Colors } from "react-native-ui-lib";
import { StyleSheet } from "react-native";

const LayoutView = ({ children }) => {
    return <View paddingH-20>{children}</View>;
};

const BaseLayout = ({ children, enablePadding }) => {
    return (
        <SafeAreaView edges={["right", "left"]} style={[styles.background, { flex: 1 }]}>
            <StatusBar style="dark" />
            <View style={enablePadding ?? { paddingHorizontal: 20 }}>{children}</View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: Colors.background,
    },
});

export { BaseLayout, LayoutView };
