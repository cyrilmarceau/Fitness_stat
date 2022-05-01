import { BUTTON_MARGIN } from "@constants";
import signupFieldsJSON from "@fields/signup.json";
import FormBuilder from "@form-builder/formBuilder";
import { yupResolver } from "@hookform/resolvers/yup";
import { BaseLayout } from "@layout/BaseLayout";
import { signupValidationSchema } from "@validations";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Colors, Incubator } from "react-native-ui-lib";
const { Toast } = Incubator;

export const SignupScreen = ({ navigation }) => {
    const formOptions = { resolver: yupResolver(signupValidationSchema) };

    const methods = useForm(formOptions);

    const onSubmit = (data) => {};

    return (
        <BaseLayout>
            {/* <LoaderScreen color={Colors.primary} overlay /> */}

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
                {/* {isError && (
                    <Toast
                        message={isSuccess ? "Inscription réussie" : message}
                        visible={isError || isSuccess ? true : false}
                        position={"top"}
                        swipeable={true}
                        autoDismiss={5000}
                        zIndex={2}
                        preset={
                            isSuccess
                                ? Incubator.ToastPresets.SUCCESS
                                : Incubator.ToastPresets.FAILURE
                        }
                        containerStyle={{ top: 0 }}
                        centerMessage
                    />
                )} */}
            </>
        </BaseLayout>
    );
};

export default SignupScreen;
