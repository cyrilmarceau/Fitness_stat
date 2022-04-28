import { useAuth } from "@contexts/authContext";
import AppTab from "@layout-navigations/tabs/AppTab";
import AuthTab from "@layout-navigations/tabs/AuthTab";
import { createStackNavigator } from "@react-navigation/stack";
import _ from "lodash";
import { Incubator } from "react-native-ui-lib";
const { Toast } = Incubator;
import React, { useState, useEffect } from "react";
import { removeKeysLS, getLS } from "@helpers";

const DispatcherNav = () => {
    const auth = useAuth();
    const Stack = createStackNavigator();
    const [errMessage, setErrorMessage] = useState("");
    const [err, setErr] = useState(null);

    const verifyTokenInvalidOrExpired = async () => {
        const { success, error, message } = await auth.verifyToken();
        console.log(success, error);
        // Check token validation and remove localStorage if token is invalid or expired
        if (!success && error) {
            setErrorMessage(message);
            setErr(true);
            await removeKeysLS(["accessToken", "refreshToken"]);
            return true;
        }
    };

    const automaticConnexion = async () => {
        const { success, error, message } = await auth.refreshToken();
        if (!success && error) {
            setErrorMessage(message);
            setErr(true);
            await removeKeysLS(["accessToken", "refreshToken"]);
            return true;
        }
    };

    useEffect(async () => {
        const isInvalidOrExpired = await verifyTokenInvalidOrExpired();
        console.log("isInvalidOrExpired", isInvalidOrExpired);
        if (isInvalidOrExpired) {
            console.log("---- INVALID ----");
            return;
        } else {
            console.log("---- AUTOMATIC ----");
            await automaticConnexion();
        }
    }, []);

    const renderStack = () => {
        if (_.isNil(auth.member)) {
            return (
                <Stack.Screen options={{ headerShown: false }} name="Auth" component={AuthTab} />
            );
        } else {
            return <Stack.Screen name="App" component={AppTab} />;
        }
    };

    return (
        <>
            {err && (
                <Toast
                    message={errMessage}
                    visible={err}
                    preset={Incubator.ToastPresets.FAILURE}
                    position={"top"}
                    swipeable={true}
                    autoDismiss={5000}
                    zIndex={2}
                    containerStyle={{ top: 0 }}
                    centerMessage
                    onDismiss={() => {
                        setErr(false);
                    }}
                />
            )}
            <Stack.Navigator>{renderStack()}</Stack.Navigator>
        </>
    );
};

export default DispatcherNav;
