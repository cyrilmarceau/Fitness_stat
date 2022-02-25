import signupFieldsJSON from "@fields/signup.json";
import FormBuilder from "@form-builder/formBuilder";
import { yupResolver } from "@hookform/resolvers/yup";
import BaseLayout from "@layout/BaseLayout";
import { signupUser } from "@redux/authSlice";
import type { AppDispatch, RootState } from "@redux/store";
import { BUTTON_MARGIN } from "@utils/constants";
import { IFormsignupInputs } from "@utils/interfaces";
import { signupValidationSchema } from "@utils/validationsSchema";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Colors, Incubator, LoaderScreen } from "react-native-ui-lib";
import { useDispatch, useSelector } from "react-redux";
const { Toast } = Incubator;

export const SignupScreen: React.FC = () => {
    const formOptions = { resolver: yupResolver(signupValidationSchema) };

    const methods = useForm<IFormsignupInputs>(formOptions);

    const { isFetching, isError, isSuccess, message } = useSelector(
        (state: RootState) => state.auth
    );
    const dispatch = useDispatch<AppDispatch>();

    const onSubmit = (data: IFormsignupInputs) => {
        dispatch(signupUser(data));
    };

    console.log("component render", message);
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
                            message={isSuccess ? "Inscription réussie" : message}
                            visible={isError || isSuccess ? true : false}
                            position={"top"}
                            swipeable={true}
                            autoDismiss={5000}
                            zIndex={2}
                            preset={isSuccess ? "success" : "failure"}
                            containerStyle={{ top: 0 }}
                            centerMessage
                        />
                    )}
                </>
            )}
        </BaseLayout>
    );
};

export default SignupScreen;
