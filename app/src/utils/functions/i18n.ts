import errorJSON from "@utils/json/i18n/errors.json";
import { KeyError, CodeError } from "../types";

export const _18n = (key: KeyError, codeError: CodeError) => errorJSON[key][codeError];
