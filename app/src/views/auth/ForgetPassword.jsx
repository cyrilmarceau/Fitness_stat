import { BUTTON_MARGIN } from "@constants";
import { useAuth } from "@contexts/authContext";
import resetPasswordFieldJSON from "@fields/resetPassword.json";
import FormBuilder from "@form-builder/formBuilder";
import { LoginSVG } from "@helpers/svgIcon";
import { yupResolver } from "@hookform/resolvers/yup";
import { BaseLayout } from "@layout/BaseLayout";
import { resetValidationSchema } from "@validations";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Colors, Incubator, View } from "react-native-ui-lib";
const { Toast } = Incubator;

const ForgetPassword = () => {
    const formOptions = { resolver: yupResolver(resetValidationSchema) };

    const methods = useForm(formOptions);
    const auth = useAuth();

    const [error, setError] = useState(false);
    const [visibleToast, setVisibleToast] = useState(false);
    const [errMessage, setErrorMessage] = useState("");

    const onSubmit = async (datas) => {
        // const { success, error, message } = await auth.login(datas);
        if (success && !error) {
            // navigation.navigate("Root", { screen: "AppTab" });
        } else {
            setError(true);
            setVisibleToast(true);
            // setErrorMessage(message);
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
        <BaseLayout enablePadding={true} enableSAV>
            <View>
                <FormProvider {...methods}>
                    <FormBuilder fieldsList={resetPasswordFieldJSON} />
                    <Button
                        onPress={methods.handleSubmit(onSubmit, onError)}
                        label="Réinitialiser mon mot de passe"
                        size={Button.sizes.large}
                        outlineColor={Colors.primary}
                        style={{ marginVertical: BUTTON_MARGIN - 15, marginTop: 0 }}
                        outline
                    />
                </FormProvider>
            </View>
        </BaseLayout>
    );
};

export default ForgetPassword;
