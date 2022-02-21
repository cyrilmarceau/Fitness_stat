import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IFormsignupInputs } from "@utils/interfaces";
import API from "@api/apiFactory";

interface IState {
    isError: boolean;
    isSuccess: boolean;
    isFetching: boolean;
    errorMessage?: string;
    errorCode?: string;
}

interface ISuccessSignup {
    data: {
        success: boolean;
        email: string;
    };
}

interface IErrorSignup {
    message: string;
    code: string;
}

type SuccessOrError = ISuccessSignup | IErrorSignup;

export const signupUser = createAsyncThunk<SuccessOrError, IFormsignupInputs>(
    "auth/signupUser",
    async (credentials: IFormsignupInputs, thunkAPI): Promise<SuccessOrError> => {
        try {
            const response: SuccessOrError = await API.createUser(credentials);
            console.log("response", response);
            return response.data;
        } catch (e: unknown) {
            const errors = thunkAPI.rejectWithValue(e.response.data);
            return errors;
        }
    }
);

const initialState = {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
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
        builder.addCase(signupUser.fulfilled, (state: IState, action) => {
            state.isFetching = false;
            state.isSuccess = true;
            console.log("fulfilled", action);
        });
        builder.addCase(signupUser.rejected, (state: IState, action) => {
            state.isFetching = false;
            state.isError = true;
            console.log("action", action.payload);
        });
    },
});

// Action creators are generated for each case reducer function
export const { clearState } = authSlice.actions;

export default authSlice.reducer;
