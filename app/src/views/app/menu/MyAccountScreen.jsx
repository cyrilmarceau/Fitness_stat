import CuToast from "@components/CuToast";
import { BUTTON_MARGIN } from "@constants";
import { useAuth } from "@contexts/authContext";
import accountFieldsJSON from "@fields/account.json";
import FormBuilder from "@form-builder/formBuilder";
import { yupResolver } from "@hookform/resolvers/yup";
import { BaseLayout } from "@layout/BaseLayout";
import { accountValidationSchema } from "@validations";
import React, { useState, useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Colors, Text } from "react-native-ui-lib";
import _ from 'lodash'
const MyAccountScreen = () => {

    const formOptions = { resolver: yupResolver(accountValidationSchema) };
    const auth = useAuth();
    const methods = useForm(formOptions, {
        defaultValues: async () => ({ firstname: 'test' })
    })

    const [toastProps, setToastProps] = useState({message: "", isError: false})
    const [displayToast, setDisplayToast] = useState(false);
    
    const onSubmit = async (values) => {

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

    useEffect(() => {
        methods.reset(auth.member);
    }, [])

    return (
        <BaseLayout enablePadding={true}>
            {displayToast && (
                <CuToast displayToast={displayToast} setDisplayToast={setDisplayToast} toastProps={toastProps} />
            )}

            <FormProvider {...methods}>
                <FormBuilder fieldsList={accountFieldsJSON} />
                <Button
                    onPress={methods.handleSubmit(onSubmit)}
                    label="Editer mon compte"
                    size={Button.sizes.large}
                    outlineColor={Colors.primary}
                    style={{ marginVertical: BUTTON_MARGIN - 15 }}
                    outline
                />
            </FormProvider>
        </BaseLayout>
    );
};

export default MyAccountScreen;
