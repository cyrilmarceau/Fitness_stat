import { IFieldList, ISuccessSignup, IErrorSignup } from "../interfaces";

export type TFieldsList = Array<IFieldList>;

export type RouteName = "Login" | "Signup";

export type SuccessOrError = ISuccessSignup | IErrorSignup;

export type KeyError = "signup";

export type CodeError = "unique";
