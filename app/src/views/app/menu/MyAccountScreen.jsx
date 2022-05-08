import CuToast from "@components/CuToast";
import { BUTTON_MARGIN } from "@constants";
import { useAuth } from "@contexts/authContext";
import accountFieldsJSON from "@fields/account.json";
import FormBuilder from "@form-builder/formBuilder";
import { BaseLayout } from "@layout/BaseLayout";
import { accountValidationSchema } from "@validations";
import { Formik } from 'formik';
import _ from 'lodash';
import React, { useState } from "react";
import { Button, Colors } from "react-native-ui-lib";

const MyAccountScreen = () => {


    const auth = useAuth();

    const [toastProps, setToastProps] = useState({message: "", isError: false})
    const [displayToast, setDisplayToast] = useState(false);
    
    const onSubmit = async (values) => {
        console.log('values', values)
        const hasPassword = _.has(values, 'new_password' && 'new_password2')

        if (hasPassword) {
            const passwordFields = _.pick(values, ['new_password1', 'new_password2'])
            console.log(passwordFields)
            const { success, error, message } = await auth.passwordChange(passwordFields)

            if (!success && error) {
                setDisplayToast(true);
                setToastProps({message: message, isError: true});
            } else {
                setDisplayToast(true);
                setToastProps({message: "Votre mot de passe a été modifié avec succès", isError: false });
            }
        }
        
        const memberFields = _.omit(values, ['new_password1', 'new_password2'])

        const { success, error, message } = await auth.updateMe(memberFields)
        
        if (!success && error) {
                setDisplayToast(true);
                setToastProps({message: message, isError: true});
        } else {
            setDisplayToast(true);
            setToastProps({message: "Votre compte a été modifié avec succès", isError: false });
        }
    };


    return (
        <BaseLayout enablePadding={true}>
            {displayToast && (
                <CuToast displayToast={displayToast} setDisplayToast={setDisplayToast} toastProps={toastProps} />
            )}

            <Formik
                validationSchema={accountValidationSchema}
                initialValues={{
                    firstname: auth.member.firstname,
                    lastname: auth.member.lastname,
                    email: auth.member.email,
                    phone: auth.member.phone,
                }}
                onSubmit={values => onSubmit(values)}
            >
                {({handleSubmit}) => (
                    <>
                        <FormBuilder fieldsList={accountFieldsJSON} />
                        <Button
                            onPress={handleSubmit}
                            label="Editer mon compte"
                            size={Button.sizes.large}
                            outlineColor={Colors.primary}
                            style={{ marginVertical: BUTTON_MARGIN - 15 }}
                            outline
                        />
                    </>
                )}
            </Formik>
        </BaseLayout>
    );
};

export default MyAccountScreen;
