import { createStackNavigator } from "@react-navigation/stack";
import MealScreen from "@views-app/MealScreen";
import React from "react";

const MealStack = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="Meal" component={MealScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default MealStack;
