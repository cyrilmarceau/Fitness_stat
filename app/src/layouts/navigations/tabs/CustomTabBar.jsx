import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text, Colors } from "react-native-ui-lib";
import _ from "lodash";

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
            case "Home":
                iconName = "home-circle-outline";
                break;
            case "WorkoutStack":
                iconName = "run";
                break;
            case "MealStack":
                iconName = "food-variant";
                break;
            case "ForgetPasswordBase":
                iconName = "lock-reset";
                break;

            default:
                break;
        }
        return <MaterialCommunityIcons name={iconName} color={color} size={24} />;
    };

    const isAuthStack = navigation.getParent().getState().routeNames.includes("AuthTab")
        ? true
        : false;

    return (
        <View
            style={{
                height: 80,
                flexDirection: "row",
                borderRadius: 20,
                backgroundColor: isAuthStack && Colors.secondary,
            }}
        >
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

                return !!options.showInTab ? (
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
                        {/* {options.tabBarLabel()} */}
                        <Text style={{ color: getColor, fontSize: 12 }}>{label}</Text>
                    </TouchableOpacity>
                ) : null;
            })}
        </View>
    );
};

export default CustomTabBar;
