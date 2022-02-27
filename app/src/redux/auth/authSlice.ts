import { createSlice } from "@reduxjs/toolkit";
import { _18n } from "@utils/functions/i18n";
import { ISignupState } from "@utils/interfaces/index";
import { signupUser } from ".";

const initialState = {
    isFetching: false,
    isSuccess: false,
    isError: false,
    message: "",
    code: "",
} as ISignupState;

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
        builder.addCase(signupUser.pending, (state: ISignupState) => {
            state.isFetching = true;
        });
        builder.addCase(signupUser.fulfilled, (state: ISignupState) => {
            state.isFetching = false;
            state.isSuccess = true;
        });
        builder.addCase(signupUser.rejected, (state: ISignupState, action) => {
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
