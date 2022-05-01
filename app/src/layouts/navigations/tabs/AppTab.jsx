import { MaterialCommunityIcons } from "@expo/vector-icons";
import { _i18n } from "@helpers";
import MealStack from "@layout-navigations/stacks/app/MealStack";
import DrawerStack from "@layout-navigations/stacks/app/DrawerStack";
import WorkoutStack from "@layout-navigations/stacks/app/WorkoutStack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DrawerActions } from "@react-navigation/native";
import HomeScreen from "@views-app/HomeScreen";
import { BlurView } from "expo-blur";
import React from "react";
import { Avatar, Colors } from "react-native-ui-lib";
import CustomTabBar from "./CustomTabBar";

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
                ...headerProps,
            })}
        >
            <Tab.Screen name="DrawerStack" component={DrawerStack} />
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={({ route }) => ({
                    tabBarLabel: "Accueil",
                })}
            />
            <Tab.Screen
                name="WorkoutStack"
                component={WorkoutStack}
                options={{
                    tabBarLabel: "Entrainements",
                }}
            />
            <Tab.Screen
                name="MealStack"
                component={MealStack}
                options={{
                    tabBarLabel: "Repas",
                }}
            />
        </Tab.Navigator>
    );
};

export default AppTab;
