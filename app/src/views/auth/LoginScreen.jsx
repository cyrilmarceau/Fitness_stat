import CuToast from "@components/CuToast";
import { screens } from "@layout-navigations/routes";
import { BUTTON_MARGIN } from "@constants";
import { useAuth } from "@contexts/authContext";
import loginFieldsJSON from "@fields/login.json";
import FormBuilder from "@form-builder/formBuilder";
import { LoginSVG } from "@helpers/svgIcon";
import { BaseLayout } from "@layout/BaseLayout";
import { loginValidationSchema } from "@validations";
import { Formik } from 'formik';
import _ from "lodash";
import React, { useState } from "react";
import { Button, Colors, LoaderScreen } from "react-native-ui-lib";
import globalS from "../../styles";

const LoginScreen = ({ navigation }) => {

    const auth = useAuth();

    const [toastProps, setToastProps] = useState({message: "", isError: false})
    const [displayToast, setDisplayToast] = useState(false);

    const onSubmit = async (datas) => {
        const { success, error, message } = await auth.login(datas);

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

            {!_.isNil(auth.loading) && auth.loading && (
                <LoaderScreen
                    color={Colors.primary}
                    containerStyle={globalS.centerLoader}
                    overlay={true}
                />
            )}

            <Formik
                validationSchema={loginValidationSchema}
                onSubmit={values => onSubmit(values)}
                initialValues={{
                    email: 'cyril@gmail.com',
                    password: 'CyrilCyril',
                }}
            >
                {({handleSubmit}) => (
                    <>
                        <FormBuilder fieldsList={loginFieldsJSON} />
                        <Button
                            onPress={handleSubmit}
                            label="Se connecter"
                            size={Button.sizes.large}
                            outlineColor={Colors.primary}
                            style={{ marginVertical: BUTTON_MARGIN - 15, marginTop: 0 }}
                            outline
                        />
                    </>
                )}
            </Formik>

            <Button
                onPress={() => navigation.navigate(screens.ForgetPasswordStack)}
                label="Mot de passe oublié"
                size={Button.sizes.large}
                outlineColor={Colors.primary}
                style={{ marginVertical: BUTTON_MARGIN - 15 }}
                outline
            />

            <LoginSVG />
        </BaseLayout>
    );
};

export default LoginScreen;
