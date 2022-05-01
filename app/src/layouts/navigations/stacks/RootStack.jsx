import AppTab from "@layout-navigations/tabs/AppTab";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";

import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";

const CustomDrawerContent = (props) => {
    console.log(props.state.routeNames);
    const currentRouteName = props.nav()?.getCurrentRoute().name; // get focused route name

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItem
                label="Settings"
                onPress={() => props.navigation.navigate("DrawerStack", { screen: "Settings" })}
            />
        </DrawerContentScrollView>
    );
};

const RootStack = ({ nav }) => {
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} nav={nav} />}>
            <Drawer.Screen name="Stack" component={AppTab} options={{ headerShown: false }} />
        </Drawer.Navigator>
    );
};

export default RootStack;
