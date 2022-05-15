import React from 'react';
import { useFormikContext } from 'formik';
import { Colors, Incubator, Text } from "react-native-ui-lib";
 
const InputTextForm = ({ fl, secureTextEntry = false }) => {
    const { TextField } = Incubator;

    const { setFieldValue, handleBlur, values, errors } = useFormikContext();
    return (
        <>
            <TextField
                name={fl.name}
                floatingPlaceholder={fl?.placeholder ? true : false}
                floatingPlaceholderColor={Colors.primary}
                onChangeText={(e) => setFieldValue(fl.name, e)}
                onBlur={handleBlur(fl.name)}
                fieldStyle={{
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.primary,
                    paddingVertical: 5,
                }}
                secureTextEntry={secureTextEntry}
                value={values[fl.name] || ''}
                enableErrors
                floatOnFocus
                showCharCounter
                {...fl}
            />
            {errors[fl.name] && <Text error marginB-15 marginT-0>{errors[fl.name]}</Text>}
        </>
       
    );
};

export default InputTextForm;
