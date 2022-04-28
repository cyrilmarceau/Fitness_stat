import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-ui-lib";

const CustomTabBar = ({ state, descriptors, navigation }) => {
    const screenOptions = (route, color) => {
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

    return (
        <View style={{ height: 80, position: "absolute", bottom: 0, left: 0, right: 0 }}>
            <BlurView tint="dark" style={[StyleSheet.absoluteFill, { flexDirection: "row" }]}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];

                    const label = options.tabBarLabel || null;

                    const isFocused = state.index === index;

                    const getColor = isFocused
                        ? options.tabBarActiveTintColor
                        : options.tabBarInactiveTintColor;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
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

export default CustomTabBar;
