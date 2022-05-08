import CuToast from "@components/CuToast";
import { BUTTON_MARGIN } from "@constants";
import { useAuth } from "@contexts/authContext";
import resetPasswordFieldJSON from "@fields/resetPassword.json";
import FormBuilder from "@form-builder/formBuilder";
import { yupResolver } from "@hookform/resolvers/yup";
import { screens } from "@layout-navigations/routes";
import { BaseLayout } from "@layout/BaseLayout";
import { resetValidationSchema } from "@validations";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { Button, Colors, View } from "react-native-ui-lib";
import globalS from "@styles";

const ForgetPassword = ({ navigation }) => {
    const formOptions = { resolver: yupResolver(resetValidationSchema) };

    const methods = useForm(formOptions);
    const auth = useAuth();

    const [toastProps, setToastProps] = useState({message: "", isError: false})
    const [displayToast, setDisplayToast] = useState(false);

    const onSubmit = async (email) => {
        const { success, error, message } = await auth.forgetPassword(email);
        console.log(success, message);
        if (!success && error) {
            setDisplayToast(true);
            setToastProps({ message: message, isError: true });
        } else {
            navigation.navigate(screens.ForgetPasswordEmailSend);
        }
    };

    return (
        <>
            {displayToast && <CuToast displayToast={displayToast} setDisplayToast={setDisplayToast} toastProps={toastProps} />}

            <View style={globalS.topBarModal} />

            <BaseLayout enablePadding={true} enableSAV>
                <FormProvider {...methods}>
                    <FormBuilder fieldsList={resetPasswordFieldJSON} />
                    <Button
                        onPress={methods.handleSubmit(onSubmit)}
                        label="Réinitialiser mon mot de passe"
                        size={Button.sizes.large}
                        outlineColor={Colors.primary}
                        style={{ marginVertical: BUTTON_MARGIN - 15, marginTop: 0 }}
                        outline
                    />
                </FormProvider>
            </BaseLayout>
        </>
    );
};

const styles = StyleSheet.create({
    topBar: {
        height: 5,
        width: 80,
        backgroundColor: Colors.primary,
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 20,
        top: 10,
    },
});

export default ForgetPassword;
