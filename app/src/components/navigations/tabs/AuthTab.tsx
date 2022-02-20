import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import LoginScreen from "@views-auth/LoginScreen";
import SignupScreen from "@views-auth/SignupScreen";
import React from "react";
import { Colors } from "react-native-ui-lib";

const AuthTab = () => {
    const Tab = createMaterialBottomTabNavigator();

    return (
        <Tab.Navigator
            sceneAnimationEnabled
            barStyle={{ backgroundColor: "white" }}
            activeColor={Colors.primary}
        >
            <Tab.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    tabBarLabel: "Se connecter",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="login" color={color} size={22} />
                    ),
                }}
            />
            <Tab.Screen
                name="Signup"
                component={SignupScreen}
                options={{
                    tabBarLabel: "S'enregistrer",
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            name="account-plus-outline"
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default AuthTab;
