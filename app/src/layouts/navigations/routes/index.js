import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as React from "react";

// STRUCTURE
// <NAME> -> screen name
// <NAME>Stack -> new stack
// <NAME>Base -> Screen that must be opened as a modal

export const screens = {
    // Auth Stack and screens
    Login: "Login",
    Signup: "Signup",
    ForgetPasswordStack: "ForgetPasswordStack",
    ForgetPassword: "ForgetPassword",
    ForgetPasswordBase: "ForgetPasswordBase",
    ForgetPasswordEmailSend: "ForgetPasswordEmailSend",

    // App Stacks and screens
    Home: "Home",
    WorkoutStack: "WorkoutStack",
    MealStack: "MealStack",
    DrawerStack: "DrawerStack",
    AccountScreen: "AccountScreen",
    SettingsScreen: "SettingsScreen",
    AboutScreen: "AboutScreen",
};

export const routes = [
    {
        name: screens.Login,
        focusedRoute: screens.Login,
        title: "Se connecter",
        showInTab: true,
        showInDrawer: false,
    },
    {
        name: screens.Signup,
        focusedRoute: screens.Signup,
        title: "S'inscrire",
        showInTab: true,
        showInDrawer: false,
    },
    {
        name: screens.ForgetPasswordStack,
        focusedRoute: screens.ForgetPasswordStack,
        title: "",
        showInTab: true,
        showInDrawer: false,
    },
    {
        name: screens.ForgetPasswordBase,
        focusedRoute: screens.ForgetPasswordBase,
        title: "Réinitialiser",
        showInTab: true,
        showInDrawer: false,
    },
    {
        name: screens.ForgetPassword,
        focusedRoute: screens.ForgetPassword,
        title: "Réinitialiser votre mot de passe",
        showInTab: false,
        showInDrawer: false,
    },
    {
        name: screens.ForgetPasswordEmailSend,
        focusedRoute: screens.ForgetPasswordEmailSend,
        title: "Réinitialiser votre mot de passe",
        showInTab: false,
        showInDrawer: false,
    },
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
        title: "Profil",
        showInTab: false,
        showInDrawer: true,
        icon: (color, size) => (
            <MaterialCommunityIcons name="account-edit-outline" size={size} color={color} />
        ),
    },
    {
        name: screens.SettingsScreen,
        focusedRoute: screens.SettingsScreen,
        title: "Paramètres",
        showInTab: false,
        showInDrawer: true,
        icon: (color, size) => <Ionicons name="ios-settings-outline" size={size} color={color} />,
    },
    {
        name: screens.AboutScreen,
        focusedRoute: screens.AboutScreen,
        title: "A propos",
        showInTab: false,
        showInDrawer: true,
        icon: (color, size) => (
            <MaterialCommunityIcons name="information-outline" size={size} color={color} />
        ),
    },
];
