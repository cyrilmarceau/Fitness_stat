import API from "@api/apiFactory";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IFormsignupInputs } from "@utils/interfaces";
import { AxiosError } from "axios";

interface ISuccessSignup {
    success: boolean;
    email: string;
}

interface IErrorSignup {
    message: string;
    code: string;
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
        // The variable type annotation of the catch clause must be 'any' or 'unknown' if inserted.
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
    errorResponse?: IErrorSignup;
}

const initialState = {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorResponse: {
        message: "",
        code: "",
    },
} as IState;

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;

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
            console.log("signupUser.rejected >>>> action", action.payload);
        });
    },
});

// Action creators are generated for each case reducer function
export const { clearState } = authSlice.actions;

export default authSlice.reducer;
