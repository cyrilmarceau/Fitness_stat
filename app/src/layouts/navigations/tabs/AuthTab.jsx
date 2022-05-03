import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { routes, screens } from "@layout-navigations/routes";
import LoginScreen from "@views-auth/LoginScreen";
import SignupScreen from "@views-auth/SignupScreen";
import ForgetPassword from "@views-auth/ForgetPassword";
import React from "react";
import { Colors } from "react-native-ui-lib";

import CustomTabBar from "./CustomTabBar";

const tabOptions = ({ route, navigation }) => {
    const item = routes.find((routeItem) => {
        // Check if in nested stack we have a screen who match with route for set title in header
        if (route?.params?.screen) {
            return routeItem.name === route.params.screen;
        }
        return routeItem.name === route.name;
    });

    return {
        title: item.title,
        tabBarLabel: item.title || "",
        headerShown: false,
        tabBarActiveTintColor: Colors.background,
        tabBarInactiveTintColor: "#F2CC8F",
        showInTab: item.showInTab,
    };
};

const AuthTab = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            initialRouteName={screens.Login}
            backBehavior="history"
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={tabOptions}
        >
            <Tab.Screen name={screens.Login} component={LoginScreen} />
            <Tab.Screen name={screens.Signup} component={SignupScreen} />
            <Tab.Screen
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        e.preventDefault();
                        navigation.navigate("ForgetPassword");
                    },
                })}
                name={screens.ForgetPasswordBase}
                component={ForgetPassword}
            />
        </Tab.Navigator>
    );
};

export default AuthTab;
