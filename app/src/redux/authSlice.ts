import API from "@api/apiFactory";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IFormsignupInputs } from "@utils/interfaces";
import { AxiosError } from "axios";
import { _18n } from "@utils/i18n";

interface ISuccessSignup {
    success: boolean;
    email: string;
}

interface IErrorSignup {
    key: {
        message: string;
        code: string;
    };
}

type SuccessOrError = ISuccessSignup | IErrorSignup;

export const signupUser = createAsyncThunk<
    SuccessOrError,
    IFormsignupInputs,
    { rejectValue: IErrorSignup }
>("auth/signupUser", async (credentials: IFormsignupInputs, { rejectWithValue }) => {
    try {
        const response = await API.createUser<IFormsignupInputs, SuccessOrError>(credentials);
        console.log("response", response);
        return response;
    } catch (err: AxiosError<IErrorSignup>) {
        const error: AxiosError<IErrorSignup> = err;
        if (!error.response) {
            throw err;
        }
        return rejectWithValue(error.response.data);
    }
});

interface IState {
    isError: boolean;
    isSuccess: boolean;
    isFetching: boolean;
    message: string;
    code: string;
}

const initialState = {
    isFetching: false,
    isSuccess: false,
    isError: false,
    message: "",
    code: "",
} as IState;

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
            state.message = "";

            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signupUser.pending, (state: IState) => {
            state.isFetching = true;
        });
        builder.addCase(signupUser.fulfilled, (state: IState) => {
            state.isFetching = false;
            state.isSuccess = true;
        });
        builder.addCase(signupUser.rejected, (state: IState, action) => {
            state.isFetching = false;
            state.isError = true;

            const result = JSON.parse(action.payload);

            const translationErrorMessage: string = _18n("signup", result.email[0].code);
            state.message = translationErrorMessage;
        });
    },
});

// Action creators are generated for each case reducer function
export const { clearState } = authSlice.actions;

export default authSlice.reducer;
