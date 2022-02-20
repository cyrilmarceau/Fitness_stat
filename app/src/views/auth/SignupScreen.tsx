import loginFieldsJSON from "@fields/signup.json";
import FormBuilder from "@form-builder/formBuilder";
import { yupResolver } from "@hookform/resolvers/yup";
import BaseLayout from "@layout/BaseLayout";
import { BUTTON_MARGIN } from "@utils/constants";
import { signupValidationSchema } from "@utils/validationsSchema";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Colors, Incubator } from "react-native-ui-lib";
const { Toast } = Incubator;

export const SignupScreen = () => {
    interface IFormsignupInputs {
        firstname: string;
        lastname: string;
        email: string;
        phone: string;
        password: string;
        passworVerify: string;
    }

    const formOptions = { resolver: yupResolver(signupValidationSchema) };

    const methods = useForm<IFormsignupInputs>(formOptions);

    const [error, setError] = useState<boolean>(false);
    const [visibleToast, setVisibleToast] = useState<boolean>(false);

    const onSubmit = (data: IFormsignupInputs) => {
        console.log("data", data);
    };

    const onError = (errors: unknown) => {
        if (errors) {
            console.log("error", errors);
            setError(true);
            setVisibleToast(true);
        }
    };

    return (
        <BaseLayout>
            {error && (
                <Toast
                    message="Il y a une erreur lors de l'inscription"
                    visible={visibleToast}
                    position={"top"}
                    swipeable={true}
                    autoDismiss={5000}
                    zIndex={2}
                    preset="failure"
                    containerStyle={{ top: 0 }}
                    centerMessage
                    onDismiss={() => setVisibleToast(!visibleToast)}
                />
            )}
            <FormProvider {...methods}>
                <FormBuilder fieldsList={loginFieldsJSON} />
                <Button
                    onPress={methods.handleSubmit(onSubmit, onError)}
                    label="S'inscrire"
                    size={Button.sizes.large}
                    outlineColor={Colors.primary}
                    style={{ marginVertical: BUTTON_MARGIN }}
                    outline
                />
            </FormProvider>
        </BaseLayout>
    );
};

export default SignupScreen;
