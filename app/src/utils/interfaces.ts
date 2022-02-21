export interface IFieldList {
    name: string;
    placeholder: string;
    type: string;
    defaultValue?: string;
    label?: string;
}

export type TFieldsList = Array<IFieldList>;

export interface IFormsignupInputs {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    password: string;
    // passworVerify: string;
}
