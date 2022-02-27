import { IFieldList } from "@utils/interfaces/index";
import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Colors, Incubator, Text } from "react-native-ui-lib";
import _ from "lodash";

const InputTextPasswordForm = ({ field }: { field: IFieldList }) => {
    const { TextField } = Incubator;
    const { control, setValue } = useFormContext();

    useEffect(() => {
        if (_.has(field, "defaultValue")) {
            setValue(field.name, field.defaultValue);
        }
    }, []);

    return (
        <Controller
            control={control}
            name={field.name}
            render={({ field: { onChange, onBlur }, formState: { errors, isSubmitted } }) => (
                <>
                    <TextField
                        floatingPlaceholder={field?.placeholder ? true : false}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        fieldStyle={{
                            borderBottomWidth: 1,
                            borderBottomColor:
                                isSubmitted && errors?.[field.name] ? Colors.error : Colors.primary,
                            paddingVertical: 5,
                        }}
                        floatingPlaceholderColor={Colors.primary}
                        enableErrors
                        floatOnFocus
                        showCharCounter
                        {...field}
                    />

                    {isSubmitted && errors?.[field.name] && (
                        <Text error>{errors?.[field.name]?.message}</Text>
                    )}
                </>
            )}
        />
    );
};

export default InputTextPasswordForm;
