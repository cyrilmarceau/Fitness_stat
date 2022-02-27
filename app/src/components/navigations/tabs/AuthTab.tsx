import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { IRoute } from "@utils/interfaces/index";
import LoginScreen from "@views-auth/LoginScreen";
import SignupScreen from "@views-auth/SignupScreen";
import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors, Text } from "react-native-ui-lib";

const screenOptions = (route: IRoute, color: string) => {
    let iconName;

    switch (route.name) {
        case "Login":
            iconName = "login";
            break;
        case "Signup":
            iconName = "account-plus-outline";
            break;
        default:
            break;
    }

    return <MaterialCommunityIcons name={iconName} color={color} size={24} />;
};

const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
        <View style={{ height: 80, position: "absolute", bottom: 0, left: 0, right: 0 }}>
            <BlurView tint="dark" style={[StyleSheet.absoluteFill, { flexDirection: "row" }]}>
                {state.routes.map((route: IRoute, index: number) => {
                    const { options } = descriptors[route.key];

                    const label: string = options.tabBarLabel || null;

                    const isFocused = state.index === index;

                    const getColor: string = isFocused
                        ? options.tabBarActiveTintColor
                        : options.tabBarInactiveTintColor;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            // The `merge: true` option makes sure that the params inside the tab screen are preserved
                            navigation.navigate({ name: route.name, merge: true });
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: "tabLongPress",
                            target: route.key,
                        });
                    };

                    return (
                        <TouchableOpacity
                            key={index}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{
                                flex: 1,
                                alignItems: "center",
                                top: 12,
                                transform: [{ scale: isFocused ? 1.07 : 1 }],
                            }}
                        >
                            {screenOptions(descriptors[route.key].route, getColor)}
                            <Text style={{ color: getColor, fontSize: 12 }}>{label}</Text>

                            <View>{options.tabBarIcon}</View>
                        </TouchableOpacity>
                    );
                })}
            </BlurView>
        </View>
    );
};

const AuthTab = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            initialRouteName="Login"
            backBehavior="history"
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.primaryExtraLight,
            }}
        >
            <Tab.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    tabBarLabel: "Connexion",
                }}
            />
            <Tab.Screen
                name="Signup"
                component={SignupScreen}
                options={{
                    tabBarLabel: "Inscription",
                }}
            />
        </Tab.Navigator>
    );
};

export default AuthTab;
