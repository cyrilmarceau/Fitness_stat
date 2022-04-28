import React from "react";
import { Text, View } from "react-native-ui-lib";
import InputTextForm from "./InputTextForm";
import InputTextPasswordForm from "./InputTextPasswordForm";

const FormBuilder = ({ fieldsList }) => {
    return (
        <View>
            {fieldsList.length > 0 &&
                fieldsList.map((fl, i) => {
                    let render = "";

                    switch (fl.type) {
                        case "text":
                            render = <InputTextForm field={fl} key={"fl-" + i} />;
                            break;
                        case "password":
                            render = <InputTextPasswordForm field={fl} key={"fl-" + i} />;
                            break;

                        default:
                            render = <Text key={fl.label}>Field null</Text>;
                    }

                    return render;
                })}
        </View>
    );
};

export default FormBuilder;
