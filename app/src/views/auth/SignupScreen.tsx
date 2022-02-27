import FormBuilder from "@form-builder/formBuilder";
import { yupResolver } from "@hookform/resolvers/yup";
import BaseLayout from "@layout/BaseLayout";
import { clearState } from "@redux/auth/authSlice";
import { signupUser } from "@redux/auth/index";
import type { AppDispatch, RootState } from "@redux/store";
import { BUTTON_MARGIN } from "@utils/constants";
import { IFormsignupInputs } from "@utils/interfaces";
import signupFieldsJSON from "@utils/json/form/signup.json";
import { signupValidationSchema } from "@utils/validations";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Colors, Incubator, LoaderScreen } from "react-native-ui-lib";
import { useDispatch, useSelector } from "react-redux";
const { Toast } = Incubator;

export const SignupScreen = ({ navigation }) => {
    const formOptions = { resolver: yupResolver(signupValidationSchema) };

    const methods = useForm<IFormsignupInputs>(formOptions);

    const { isFetching, isError, isSuccess, message } = useSelector(
        (state: RootState) => state.auth
    );
    const dispatch = useDispatch<AppDispatch>();

    const onSubmit = (data: IFormsignupInputs) => {
        dispatch(signupUser(data));
    };

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                dispatch(clearState());
                navigation.navigate("Login");
            }, 1500);
        }
    }, [isSuccess]);

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
                            // preset={isSuccess ? "success" : "failure"}
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
