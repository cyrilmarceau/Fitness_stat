import { RouteName } from "../types";

export interface IFieldList {
    name: string;
    placeholder: string;
    type: string;
    defaultValue?: string;
    label?: string;
}

export interface IFormsignupInputs {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    password: string;
}

export interface IRoute {
    key: string | number;
    name: RouteName;
}

export interface ISuccessSignup {
    success: boolean;
    email: string;
}

export interface IErrorSignup {
    key: {
        message: string;
        code: string;
    };
}

export interface ISignupState {
    isError: boolean;
    isSuccess: boolean;
    isFetching: boolean;
    message: string;
    code: string;
}

export interface IFormLoginInputs {
    email: string;
    password: string;
}
