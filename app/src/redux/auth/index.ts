import API from "@api/index";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IFormsignupInputs } from "@utils/interfaces";
import { IErrorSignup } from "@utils/interfaces/index";
import { SuccessOrError } from "@utils/types/index";
import { AxiosError } from "axios";

export const signupUser = createAsyncThunk<
    SuccessOrError,
    IFormsignupInputs,
    { rejectValue: IErrorSignup }
>("auth/signupUser", async (credentials: IFormsignupInputs, { rejectWithValue }) => {
    try {
        const response = await API.createUser<IFormsignupInputs, SuccessOrError>(credentials);
        return response;
    } catch (err: AxiosError<IErrorSignup>) {
        const error: AxiosError<IErrorSignup> = err;
        if (!error.response) {
            throw err;
        }
        return rejectWithValue(error.response.data);
    }
});
