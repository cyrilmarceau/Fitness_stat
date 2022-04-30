import { useAuth } from "@contexts/authContext";
import { removeKeysLS } from "@helpers";
import AuthStack from "@layout-navigations/stacks/AuthStack";
import RootStack from "@layout-navigations/stacks/RootStack";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Incubator } from "react-native-ui-lib";
const { Toast } = Incubator;

const DispatcherNav = () => {
    const auth = useAuth();

    const [errMessage, setErrorMessage] = useState("");
    const [err, setErr] = useState(null);

    const verifyTokenInvalidOrExpired = async () => {
        const { success, error, message } = await auth.verifyToken();

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
        if (isInvalidOrExpired) {
            return;
        } else {
            await automaticConnexion();
        }
    }, []);

    return (
        <>
            {_.isNil(auth.member) ? <AuthStack /> : <RootStack />}
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
        </>
    );
};

export default DispatcherNav;
