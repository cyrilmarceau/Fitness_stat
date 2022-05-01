import { MaterialCommunityIcons } from "@expo/vector-icons";
import { routes, screens } from "@layout-navigations/routes";
import DrawerStack from "@layout-navigations/stacks/app/DrawerStack";
import MealStack from "@layout-navigations/stacks/app/MealStack";
import WorkoutStack from "@layout-navigations/stacks/app/WorkoutStack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "@views-app/HomeScreen";
import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet } from "react-native";
import { Avatar, Colors, View } from "react-native-ui-lib";
import CustomTabBar from "./CustomTabBar";

const tabOptions = ({ route, navigation }) => {
    const item = routes.find((routeItem) => routeItem.name === route.name); // get the route config object

    const commonHeader = {
        headerRightContainerStyle: {
            paddingRight: 20,
        },
        headerLeftContainerStyle: {
            paddingLeft: 20,
        },
        headerRight: () => (
            <Avatar
                size={28}
                source={{
                    uri: "https://lh3.googleusercontent.com/-cw77lUnOvmI/AAAAAAAAAAI/AAAAAAAAAAA/WMNck32dKbc/s181-c/104220521160525129167.jpg",
                }}
            />
        ),
        headerLeft: () => (
            <>
                <MaterialCommunityIcons
                    name="menu"
                    size={28}
                    color="black"
                    onPress={() => navigation.toggleDrawer()}
                />
            </>
        ),
        title: item.title,
    };
    if (!item.showInTab) {
        return {
            tabBarButton: () => <View style={{ width: 0 }} />,
            ...commonHeader,
        };
    }

    return {
        tabBarLabel: item.title || "",
        headerShown: true,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.background,
        ...commonHeader,
    };
};

const AppTab = ({ navigation }) => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            backBehavior="history"
            tabBar={(props) => (
                <BlurView style={styles.blurView} tint="dark">
                    <CustomTabBar {...props} />
                </BlurView>
            )}
            screenOptions={tabOptions}
        >
            <Tab.Screen name={screens.DrawerStack} component={DrawerStack} />
            <Tab.Screen name={screens.Home} component={HomeScreen} />
            <Tab.Screen name={screens.WorkoutStack} component={WorkoutStack} />
            <Tab.Screen name={screens.MealStack} component={MealStack} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    blurView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
});

export default AppTab;
