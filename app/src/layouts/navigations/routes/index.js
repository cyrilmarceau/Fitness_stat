import * as React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

export const screens = {
    Home: "Home",
    WorkoutStack: "WorkoutStack",
    MealStack: "MealStack",
    DrawerStack: "DrawerStack",
    SettingsScreen: "SettingsScreen",
    AccountScreen: "AccountScreen",
};

export const routes = [
    {
        name: screens.Home,
        focusedRoute: screens.Home,
        title: "Accueil",
        showInTab: true,
        showInDrawer: false,
    },
    {
        name: screens.WorkoutStack,
        focusedRoute: screens.WorkoutStack,
        title: "Entraînements",
        showInTab: true,
        showInDrawer: false,
    },
    {
        name: screens.MealStack,
        focusedRoute: screens.MealStack,
        title: "Repas",
        showInTab: true,
        showInDrawer: false,
    },
    {
        name: screens.DrawerStack,
        focusedRoute: screens.DrawerStack,
        showInTab: false,
        showInDrawer: false,
    },
    {
        name: screens.AccountScreen,
        focusedRoute: screens.AccountScreen,
        title: "Mon compte",
        showInTab: false,
        showInDrawer: true,
    },
    {
        name: screens.SettingsScreen,
        focusedRoute: screens.SettingsScreen,
        title: "Paramètres",
        showInTab: false,
        showInDrawer: true,
    },
];
