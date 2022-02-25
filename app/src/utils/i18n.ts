import errorJSON from "@i18n/errors.json";

type KeyError = "signup";
type CodeError = "unique";

export const _18n = (key: KeyError, codeError: CodeError) => errorJSON[key][codeError];
