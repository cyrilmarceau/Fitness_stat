import signupFieldsJSON from "@fields/signup.json";
import FormBuilder from "@form-builder/formBuilder";
import { yupResolver } from "@hookform/resolvers/yup";
import BaseLayout from "@layout/BaseLayout";
import { signupUser } from "@redux/authSlice";
import type { AppDispatch, RootState } from "@redux/store";
import { BUTTON_MARGIN } from "@utils/constants";
import { IFormsignupInputs } from "@utils/interfaces";
import { signupValidationSchema } from "@utils/validationsSchema";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Colors, Incubator, LoaderScreen } from "react-native-ui-lib";
import { useDispatch, useSelector } from "react-redux";
const { Toast } = Incubator;

export const SignupScreen: React.FC = () => {
    const formOptions = { resolver: yupResolver(signupValidationSchema) };

    const methods = useForm<IFormsignupInputs>(formOptions);

    const { isFetching, isError, isSuccess } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();

    const [visibleToast, setVisibleToast] = useState<boolean>(false);

    const onSubmit = (data: IFormsignupInputs) => {
        /**
         * Todo:
         * Afficher Toast en success si l'utilisateur est bien crée
         */
        dispatch(signupUser(data));
    };

    // const onError = (errors: unknown) => {
    //     if (errors) {
    //         setError(true);
    //         setVisibleToast(true);
    //     }
    // };

    console.log("component render", isError);
    return (
        <BaseLayout>
            {isFetching ? (
                <LoaderScreen color={Colors.primary} overlay />
            ) : (
                <>
                    <FormProvider {...methods}>
                        <FormBuilder fieldsList={signupFieldsJSON} />
                        <Button
                            onPress={methods.handleSubmit(onSubmit)}
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
