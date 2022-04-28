import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Colors, Incubator, Text } from "react-native-ui-lib";
import _ from "lodash";

const InputTextForm = ({ field }) => {
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
                        floatingPlaceholderColor={Colors.primary}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        fieldStyle={{
                            borderBottomWidth: 1,
                            borderBottomColor: Colors.primary,
                            paddingVertical: 5,
                        }}
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

export default InputTextForm;
