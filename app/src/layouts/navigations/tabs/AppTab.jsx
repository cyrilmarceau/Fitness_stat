import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../../views/app/HomeScreen";
import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors, Text } from "react-native-ui-lib";
import CustomTabBar from "./CustomTabBar";

const AppTab = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            backBehavior="history"
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.primaryExtraLight,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: "Connexion",
                }}
            />
        </Tab.Navigator>
    );
};

export default AppTab;
