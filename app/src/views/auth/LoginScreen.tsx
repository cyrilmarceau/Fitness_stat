import loginFieldsJSON from "@utils/json/form/login.json";
import FormBuilder from "@form-builder/formBuilder";
import { yupResolver } from "@hookform/resolvers/yup";
import BaseLayout from "@layout/BaseLayout";
import { BUTTON_MARGIN } from "@utils/constants";
import { loginValidationSchema } from "@utils/validations";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Colors, Incubator } from "react-native-ui-lib";
import { IFormLoginInputs } from "@utils/interfaces/index";
const { Toast } = Incubator;

const LoginScreen = () => {
    const formOptions = { resolver: yupResolver(loginValidationSchema) };

    const methods = useForm<IFormLoginInputs>(formOptions);

    const [error, setError] = useState<boolean>(false);
    const [visibleToast, setVisibleToast] = useState<boolean>(false);

    const onSubmit = (data: IFormLoginInputs) => {
        console.log("data", data);
    };

    const onError = (errors: unknown) => {
        if (errors) {
            setError(true);
            setVisibleToast(true);
        }
    };

    return (
        <BaseLayout>
            {error && (
                <Toast
                    message="Il y a une erreur lors de l'authentification"
                    visible={visibleToast}
                    position={"top"}
                    swipeable={true}
                    autoDismiss={5000}
                    zIndex={2}
                    containerStyle={{ top: 0 }}
                    centerMessage
                    onDismiss={() => setVisibleToast(!visibleToast)}
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
