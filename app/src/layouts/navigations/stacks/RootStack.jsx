import { MaterialCommunityIcons } from "@expo/vector-icons";
import { routes } from "@layout-navigations/routes";
import AppTab from "@layout-navigations/tabs/AppTab";
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItem,
} from "@react-navigation/drawer";
import React from "react";
import { Avatar, Text } from "react-native-ui-lib";

const CustomDrawerContent = (props) => {
    const currentRouteName = props.nav()?.getCurrentRoute().name; // get focused route name

    return (
        <DrawerContentScrollView {...props}>
            {routes
                .filter((route) => route.showInDrawer)
                .map((route, index) => {
                    const focused = index === props.state.index;

                    return (
                        <DrawerItem
                            key={route.name}
                            label={() => <Text>{route.title}</Text>}
                            onPress={() =>
                                props.navigation.navigate("DrawerStack", { screen: route.name })
                            }
                        />
                    );
                })}
        </DrawerContentScrollView>
    );
};

const RootStack = ({ nav }) => {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator
            screenOptions={{ headerShown: false }}
            drawerContent={(props) => <CustomDrawerContent {...props} nav={nav} />}
        >
            <Drawer.Screen name="Stack" component={AppTab} />
        </Drawer.Navigator>
    );
};

export default RootStack;
