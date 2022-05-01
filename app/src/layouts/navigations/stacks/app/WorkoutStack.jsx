import { createStackNavigator } from "@react-navigation/stack";
import WorkoutScreen from "@views-app/WorkoutScreen";
import React from "react";

const WorkoutStack = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Workout"
                component={WorkoutScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default WorkoutStack;
