import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, View } from "react-native-ui-lib";

const LayoutView = ({ children }) => {
    return <View paddingH-20>{children}</View>;
};

const BaseLayout = ({ children, enablePadding, enableSAV }) => {
    return (
        <SafeAreaView
            edges={enableSAV ? ["left", "top", "right", "bottom"] : ["right", "left"]}
            style={[styles.background, { flex: 1 }]}
        >
            <StatusBar style="dark" />
            <View style={enablePadding && { paddingHorizontal: 20 }}>{children}</View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: Colors.background,
    },
});

export { BaseLayout, LayoutView };
