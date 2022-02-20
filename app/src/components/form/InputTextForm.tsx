import { IFieldList } from "@utils/interfaces";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Colors, Incubator, Text } from "react-native-ui-lib";

const InputTextForm = ({ field }: { field: IFieldList }) => {
    const { TextField } = Incubator;
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name={field.name}
            render={({ field: { onChange, onBlur }, formState: { errors, isSubmitted } }) => (
                <>
                    <TextField
                        placeholder={field.placeholder}
                        floatingPlaceholder={field?.placeholder ? true : false}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        fieldStyle={{
                            borderBottomWidth: 1,
                            borderBottomColor: Colors.primary,
                            paddingVertical: 5,
                        }}
                        floatingPlaceholderColor={Colors.primary}
                        enableErrors
                        floatOnFocus
                        showCharCounter
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
