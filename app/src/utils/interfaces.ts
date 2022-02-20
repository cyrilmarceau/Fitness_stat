export interface IFieldList {
    name: string;
    placeholder: string;
    type: string;
    defaultValue?: string;
    label?: string;
}

export type TFieldsList = Array<IFieldList>;
