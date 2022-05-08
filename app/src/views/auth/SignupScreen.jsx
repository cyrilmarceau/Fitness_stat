import CuToast from "@components/CuToast";
import { BUTTON_MARGIN } from "@constants";
import { useAuth } from "@contexts/authContext";
import signupFieldsJSON from "@fields/signup.json";
import FormBuilder from "@form-builder/formBuilder";
import { BaseLayout } from "@layout/BaseLayout";
import { signupValidationSchema } from "@validations";
import { Formik } from 'formik';
import React, { useState } from "react";
import { Button, Colors, Text } from "react-native-ui-lib";

export const SignupScreen = ({ navigation }) => {

    const auth = useAuth();

    const [toastProps, setToastProps] = useState({message: "", isError: false})
    const [displayToast, setDisplayToast] = useState(false);

    const onSubmit = async (values) => {
        const { success, error, message } = await auth.signup(values);

        if (!success && error) {
            setDisplayToast(true);
            setToastProps({message: message, isError: true});
        }
    };

    return (
        <BaseLayout enablePadding={true} enableSAV>
            {displayToast && (
                <CuToast displayToast={displayToast} setDisplayToast={setDisplayToast} toastProps={toastProps} />
            )}
            <Text h4 primary center>
                C'est le moment de s'inscrire sur fitness stat :)
            </Text>

            <Formik
                    validationSchema={signupValidationSchema}
                    onSubmit={values => onSubmit(values)}
                >
                    {({handleSubmit}) => (
                        <>
                            <FormBuilder fieldsList={signupFieldsJSON} />
                             <Button
                                onPress={handleSubmit}
                                label="Je créer mon compte"
                                size={Button.sizes.large}
                                outlineColor={Colors.primary}
                                style={{ marginVertical: BUTTON_MARGIN - 15 }}
                                outline
                            />
                        </>
                    )}
            </Formik>

            {/* <FormProvider {...methods}>
                <FormBuilder fieldsList={signupFieldsJSON} />
                <Button
                    onPress={methods.handleSubmit(onSubmit)}
                    label="Je créer mon compte"
                    size={Button.sizes.large}
                    outlineColor={Colors.primary}
                    style={{ marginVertical: BUTTON_MARGIN - 15 }}
                    outline
                />
            </FormProvider> */}
        </BaseLayout>
    );
};

export default SignupScreen;
