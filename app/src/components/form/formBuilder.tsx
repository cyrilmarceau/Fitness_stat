import { IFieldList } from "@utils/interfaces/index";
import { TFieldsList } from "@utils/types";
import React from "react";
import { Text, View } from "react-native-ui-lib";
import InputTextForm from "./InputTextForm";
import InputTextPasswordForm from "./InputTextPasswordForm";

const FormBuilder = ({ fieldsList }: { fieldsList: TFieldsList }) => {
    return (
        <View>
            {fieldsList.length > 0 &&
                fieldsList.map((fl: IFieldList, i: number) => {
                    let render: React.ReactNode = "";

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
