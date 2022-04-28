import { BUTTON_MARGIN } from "@constants";
import { useAuth } from "@contexts/authContext";
import loginFieldsJSON from "@fields/login.json";
import FormBuilder from "@form-builder/formBuilder";
import { yupResolver } from "@hookform/resolvers/yup";
import BaseLayout from "@layout/BaseLayout";
import { loginValidationSchema } from "@validations";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Colors, Incubator, LoaderScreen } from "react-native-ui-lib";
import styles from "../../styles";
const { Toast } = Incubator;

const LoginScreen = ({ navigation }) => {
    const formOptions = { resolver: yupResolver(loginValidationSchema) };

    const methods = useForm(formOptions);
    const auth = useAuth();

    const [error, setError] = useState(false);
    const [visibleToast, setVisibleToast] = useState(false);
    const [errMessage, setErrorMessage] = useState("");

    const onSubmit = async (datas) => {
        const { success, error, message } = await auth.login(datas);
        if (success && !error) {
            navigation.navigate("App", { screen: "Home" });
        } else {
            setError(true);
            setVisibleToast(true);
            setErrorMessage(message);
        }
    };

    const onError = (errors) => {
        if (errors) {
            setError(true);
            setVisibleToast(true);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setError(false);
            setVisibleToast(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <BaseLayout>
            {!_.isNil(auth.loading) && auth.loading && (
                <LoaderScreen
                    color={Colors.primary}
                    containerStyle={styles.centerLoader}
                    overlay={true}
                />
            )}
            {error && (
                <Toast
                    message={errMessage}
                    visible={visibleToast}
                    preset={Incubator.ToastPresets.FAILURE}
                    position={"top"}
                    swipeable={true}
                    autoDismiss={3000}
                    zIndex={2}
                    containerStyle={{ top: 0 }}
                    centerMessage
                    onDismiss={() => {
                        setVisibleToast(!visibleToast), setError(false);
                    }}
                />
            )}
            <FormProvider {...methods}>
                <FormBuilder fieldsList={loginFieldsJSON} />
                <Button
                    onPress={methods.handleSubmit(onSubmit, onError)}
                    label="Se connecter"
                    size={Button.sizes.large}
                    outlineColor={Colors.primary}
                    style={{ marginVertical: BUTTON_MARGIN }}
                    outline
                />
            </FormProvider>
        </BaseLayout>
    );
};

export default LoginScreen;
