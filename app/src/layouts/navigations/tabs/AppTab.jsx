import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { DrawerActions } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { Colors, Button, Avatar } from "react-native-ui-lib";
import HomeScreen from "@views-app/HomeScreen";
import WorkoutScreen from "@views-app/WorkoutScreen";
import MealScreen from "@views-app/MealScreen";
import CustomTabBar from "./CustomTabBar";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { _i18n } from "@helpers";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const AppTab = ({ navigation }) => {
    const Tab = createBottomTabNavigator();

    const headerProps = {
        headerRightContainerStyle: {
            paddingRight: 15,
        },
        headerRight: () => (
            <Avatar
                size={28}
                source={{
                    uri: "https://lh3.googleusercontent.com/-cw77lUnOvmI/AAAAAAAAAAI/AAAAAAAAAAA/WMNck32dKbc/s181-c/104220521160525129167.jpg",
                }}
            />
        ),
        headerLeftContainerStyle: {
            paddingLeft: 15,
        },
        headerLeft: () => (
            <MaterialCommunityIcons
                name="menu"
                size={28}
                color="black"
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
        ),
    };
    const Drawer = createDrawerNavigator();
    return (
        <Tab.Navigator
            initialRouteName="Home"
            backBehavior="history"
            tabBar={(props) => (
                <BlurView
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                    }}
                    tint="dark"
                >
                    <CustomTabBar {...props} />
                </BlurView>
            )}
            screenOptions={({ route }) => ({
                headerShown: true,
                title: route?.name ? _i18n("route", route.name) : "",
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.background,
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={({ route }) => ({
                    tabBarLabel: "Accueil",
                    ...headerProps,
                })}
            />
            <Tab.Screen
                name="Workout"
                component={WorkoutScreen}
                options={{
                    tabBarLabel: "Entrainements",
                }}
            />
            <Tab.Screen
                name="Meal"
                component={MealScreen}
                options={{
                    tabBarLabel: "Repas",
                }}
            />
        </Tab.Navigator>
    );
};

export default AppTab;
