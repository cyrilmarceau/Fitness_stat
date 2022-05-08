import CuToast from "@components/CuToast";
import { BUTTON_MARGIN } from "@constants";
import { useAuth } from "@contexts/authContext";
import resetPasswordFieldJSON from "@fields/resetPassword.json";
import FormBuilder from "@form-builder/formBuilder";
import { screens } from "@layout-navigations/routes";
import { BaseLayout } from "@layout/BaseLayout";
import globalS from "@styles";
import { resetValidationSchema } from "@validations";
import { Formik } from 'formik';
import React, { useState } from "react";
import { Button, Colors, View } from "react-native-ui-lib";

const ForgetPassword = ({ navigation }) => {
    const auth = useAuth();

    const [toastProps, setToastProps] = useState({message: "", isError: false})
    const [displayToast, setDisplayToast] = useState(false);

    const onSubmit = async (email) => {
        const { success, error, message } = await auth.forgetPassword(email);

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
                <Formik
                    validationSchema={resetValidationSchema}
                    onSubmit={values => onSubmit(values)}
                >
                    {({handleSubmit}) => (
                        <>
                            <FormBuilder fieldsList={resetPasswordFieldJSON} />
                            <Button
                                onPress={handleSubmit}
                                label="Réinitialiser mon mot de passe"
                                size={Button.sizes.large}
                                outlineColor={Colors.primary}
                                style={{ marginVertical: BUTTON_MARGIN - 15, marginTop: 0 }}
                                outline
                            />
                        </>
                    )}
                </Formik>
            </BaseLayout>
        </>
    );
};


export default ForgetPassword;
