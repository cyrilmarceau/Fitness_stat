import { BUTTON_MARGIN } from "@constants";
import signupFieldsJSON from "@fields/signup.json";
import FormBuilder from "@form-builder/formBuilder";
import { yupResolver } from "@hookform/resolvers/yup";
import { BaseLayout } from "@layout/BaseLayout";
import { signupValidationSchema } from "@validations";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Colors, Incubator, Text } from "react-native-ui-lib";
const { Toast } = Incubator;

export const SignupScreen = ({ navigation }) => {
    const formOptions = { resolver: yupResolver(signupValidationSchema) };

    const methods = useForm(formOptions);

    const onSubmit = (data) => {};

    return (
        <BaseLayout enablePadding={true} enableSAV>
            <Text h4 primary center>
                C'est le moment de s'inscrire sur fitness stat :)
            </Text>

            <FormProvider {...methods}>
                <FormBuilder fieldsList={signupFieldsJSON} />
                <Button
                    onPress={methods.handleSubmit(onSubmit)}
                    label="Je créer mon compte"
                    size={Button.sizes.large}
                    outlineColor={Colors.primary}
                    style={{ marginVertical: BUTTON_MARGIN - 15 }}
                    outline
                />
            </FormProvider>
        </BaseLayout>
    );
};

export default SignupScreen;
