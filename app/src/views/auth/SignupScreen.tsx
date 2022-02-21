import ApiFactory from "@api/apiFactory";
import signupFieldsJSON from "@fields/signup.json";
import FormBuilder from "@form-builder/formBuilder";
import { yupResolver } from "@hookform/resolvers/yup";
import BaseLayout from "@layout/BaseLayout";
import { BUTTON_MARGIN } from "@utils/constants";
import { IFormsignupInputs } from "@utils/interfaces";
import { signupValidationSchema } from "@utils/validationsSchema";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Colors, Incubator, LoaderScreen } from "react-native-ui-lib";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@redux/store";
const { Toast } = Incubator;

import { signupUser } from "@redux/authSlice";

export const SignupScreen = () => {
    const formOptions = { resolver: yupResolver(signupValidationSchema) };

    const methods = useForm<IFormsignupInputs>(formOptions);

    const { user, isFetching, isError, isSuccess, errorMessage } = useSelector(
        (state: RootState) => state.auth
    );
    const dispatch = useDispatch<AppDispatch>();

    const [error, setError] = useState<boolean>(false);
    const [visibleToast, setVisibleToast] = useState<boolean>(false);

    const onSubmit = (data: IFormsignupInputs) => {
        /**
         * Todo:
         * Faire afficher un loader quand la promesse est à pending
         * Afficher Toast en success si l'utilisateur est bien crée
         * Afficher Toast en erreur si la requête est mal passez
         */
        dispatch(signupUser(data));
    };

    const onError = (errors: unknown) => {
        if (errors) {
            setError(true);
            setVisibleToast(true);
        }
    };

    useEffect(() => {
        if (isError) {
            setVisibleToast(true);
        }
    }, [isSuccess, isError]);

    return (
        <BaseLayout>
            {isFetching ? (
                <LoaderScreen color={Colors.primary} overlay />
            ) : (
                <>
                    <FormProvider {...methods}>
                        <FormBuilder fieldsList={signupFieldsJSON} />
                        <Button
                            onPress={methods.handleSubmit(onSubmit, onError)}
                            label="S'inscrire"
                            size={Button.sizes.large}
                            outlineColor={Colors.primary}
                            style={{ marginVertical: BUTTON_MARGIN }}
                            outline
                        />
                    </FormProvider>
                    {isError && (
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
                </>
            )}
        </BaseLayout>
    );
};

export default SignupScreen;
