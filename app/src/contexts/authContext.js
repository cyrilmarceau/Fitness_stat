import React, { createContext, useContext, useState } from "react";
import _ from "lodash";
import API from "@api";
import { _i18n, setKeyLS, getLS, removeKeysLS } from "@helpers";
import axios from "axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [member, setMember] = useState();
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(null);

    let nonError = {
        success: true,
        error: false,
        message: null,
    };

    const login = async (values) => {
        setLoading(true);

        try {
            const res = await API.login(values);

            if (!_.isNil(res.access_token)) {
                setKeyLS("accessToken", res.access_token);
                setKeyLS("refreshToken", res.refresh_token);

                setMember(res.user);
                setIsAuth(true);

                return nonError;
            }
        } catch (err) {
            if (!_.isNil(err.response) && !_.isNil(err.response.status)) {
                switch (err.response.status) {
                    case 400:
                        const res = err.response.data;
  
                        if (!_.isEmpty(res.non_field_errors)) {
                            if (res.non_field_errors[0] === "E-mail is not verified.") {
                                return {
                                    success: false,
                                    error: true,
                                    message: _i18n("login", "email_not_verified"),
                                };
                            } else if (
                                res.non_field_errors[0] ===
                                "Unable to log in with provided credentials."
                            ) {
                                return {
                                    success: false,
                                    error: true,
                                    message: _i18n("login", "bad_credential"),
                                };
                            }
                        }
                    default:
                        return {
                            success: false,
                            error: true,
                            message: _i18n("default", "request_blocked"),
                        };
                }
            } else {
                return {
                    success: false,
                    error: true,
                    message: _i18n("default", "request_blocked"),
                };
            }
        } finally {
            setLoading(false);
        }
    };

    const passwordChange = async (values) => {
        setLoading(true);

        try {
            const {detail} = await API.passwordChange(values);
            if (detail === "New password has been saved.") {
                return nonError;
            }
        } catch (err) {
            if (!_.isNil(err.response) && !_.isNil(err.response.status)) {
                switch (err.response.status) {
                    case 400:
                        const res = err.response.data;

                        if (!_.isEmpty(res.new_password2)) {
                            if (res.new_password2.includes('The two password fields didn’t match.')) {
                                return {
                                    success: false,
                                    error: true,
                                    message: _i18n("passwordChange", "password_not_match"),
                                };
                            } else if (res.new_password2.includes('The password is too similar to the email.')) {
                                return {
                                    success: false,
                                    error: true,
                                    message: _i18n("passwordChange", "password_too_similar_to_email"),
                                };
                            } else if (res.new_password2.includes('This password is too short. It must contain at least 8 characters.')) {
                                return {
                                    success: false,
                                    error: true,
                                    message: _i18n("passwordChange", "password_too_short"),
                                };
                            }
                        }
                    default:
                        return {
                            success: false,
                            error: true,
                            message: _i18n("default", "request_blocked"),
                        };
                }
            } else {
                return {
                    success: false,
                    error: true,
                    message: _i18n("default", "request_blocked"),
                };
            }
        } finally {
            setLoading(false);
        }
    };

    const updateMe = async (values) => {
        setLoading(true);

        try {
            const res = await API.editMe(values);
            if (!_.isNil(res)) {
                setMember(res);
                return nonError
            }
           
        } catch (err) {
            if (!_.isNil(err.response) && !_.isNil(err.response.status)) {
                switch (err.response.status) {
                    case 400:
                        const res = err.response.data;

                         if (!_.isEmpty(res.email)) {
                            if (res.email[0] === "Enter a valid email address.") {
                                return {
                                    success: false,
                                    error: true,
                                    message: _i18n("updateMember", "invalid_email"),
                                };
                            }
                        }
                    default:
                        return {
                            success: false,
                            error: true,
                            message: _i18n("default", "request_blocked"),
                        };
                }
            } else {
                return {
                    success: false,
                    error: true,
                    message: _i18n("default", "request_blocked"),
                };
            }
        } finally {
            setLoading(false);
        }
    };


    const forgetPassword = async (email) => {
        setLoading(true);

        try {
            const { detail } = await API.forgetPassword(email);
            if (detail === "Password reset e-mail has been sent.") {
                return nonError;
            }
        } catch (err) {
            if (!_.isNil(err.response) && !_.isNil(err.response.status)) {
                switch (err.response.status) {
                    case 400:
                        const res = err.response.data;

                        if (!_.isEmpty(res.email)) {
                            if (res.email[0] === "Enter a valid email address.") {
                                return {
                                    success: false,
                                    error: true,
                                    message: _i18n("forgetPassword", "invalid_email"),
                                };
                            }
                        }
                    default:
                        return {
                            success: false,
                            error: true,
                            message: _i18n("default", "request_blocked"),
                        };
                }
            } else {
                return {
                    success: false,
                    error: true,
                    message: _i18n("default", "request_blocked"),
                };
            }
        } finally {
            setLoading(false);
        }
    };

    const signup = async (values) => {
        setLoading(true);

        try {
            const { detail } = await API.signup(values);
            if (detail === "Verification e-mail sent.") {
                return nonError;
            }
        } catch (err) {
            if (!_.isNil(err.response) && !_.isNil(err.response.status)) {

                switch (err.response.status) {
                    case 400:
                        const res = err.response.data;
                        if (!_.isEmpty(res.email)) {
                            if (res.email[0] === "Enter a valid email address.") {
                                return {
                                    success: false,
                                    error: true,
                                    message: _i18n("signup", "invalid_email"),
                                };
                            } else if (
                                res.email[0] ===
                                "A user is already registered with this e-mail address."
                            ) {
                                return {
                                    success: false,
                                    error: true,
                                    message: _i18n("signup", "email_already_exist"),
                                };
                            }
                        }

                        if (!_.isEmpty(res.password1)) {
                            if (
                                res.password1[0] ===
                                "This password is too short. It must contain at least 8 characters."
                            ) {
                                return {
                                    success: false,
                                    error: true,
                                    message: _i18n("signup", "password_too_short"),
                                };
                            }
                        }

                        if (!_.isEmpty(res.non_field_errors)) {
                            if (
                                res.non_field_errors[0] === "The two password fields didn't match."
                            ) {
                                return {
                                    success: false,
                                    error: true,
                                    message: _i18n("signup", "password_not_match"),
                                };
                            }
                        }
                    default:
                        return {
                            success: false,
                            error: true,
                            message: _i18n("default", "impossible_signup"),
                        };
                }
            } else {
                return {
                    success: false,
                    error: true,
                    message: _i18n("default", "impossible_signup"),
                };
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            const { detail } = await API.logout();
            if (detail === "Successfully logged out.") {
                await removeKeysLS(["accessToken", "refreshToken"]);
                setIsAuth(false);
                return nonError;
            }
        } catch (error) {}
    };

    const verifyToken = async () => {
        try {
            const accessTokenLS = await getLS("accessToken");

            if (!_.isNil(accessTokenLS)) {
                let request = { token: accessTokenLS };
                const res = await API.verifyToken(request);

                // Token valid
                if (_.isEmpty(res)) return nonError;
            } else {
                return {
                    success: false,
                    error: true,
                    message: _i18n("verifyToken", "impossible_verify_token"),
                };
            }
        } catch (err) {
            if (!_.isNil(err.response) && !_.isNil(err.response.status)) {
                switch (err.response.status) {
                    case 401:
                        const res = err.response.data;

                        return {
                            success: false,
                            error: true,
                            message: _i18n("verifyToken", "token_not_valid"),
                        };

                    default:
                        return {
                            success: false,
                            error: true,
                            message: _i18n("verifyToken", "impossible_verify_token"),
                        };
                }
            }
        }
    };

    const refreshToken = async () => {
        try {
            const refreshTokenLS = await getLS("refreshToken");

            if (!_.isNil(refreshTokenLS)) {
                const request = { refresh: refreshTokenLS };

                const { access, refresh } = await API.refreshToken(request);

                setKeyLS("accessToken", access);
                setKeyLS("refreshToken", refresh);

                axios.defaults.headers.common["Authorization"] = `JWT ${access}`;

                const me = await API.me();
                setMember(me);
                setIsAuth(true);

                return nonError;
            }
        } catch (err) {
            if (!_.isNil(err.response) && !_.isNil(err.response.status)) {
                switch (err.response.status) {
                    case 401:
                        const res = err.response.data;

                        return {
                            success: false,
                            error: true,
                            message: _i18n("verifyToken", res.code),
                        };

                    default:
                        return {
                            success: false,
                            error: true,
                            message: _i18n("verifyToken", "impossible_verify_token"),
                        };
                }
            }
        }
    };

    return (
        <AuthContext.Provider
            value={{
                member,
                loading,
                isAuth,
                updateMe,
                login,
                signup,
                passwordChange,
                forgetPassword,
                logout,
                verifyToken,
                refreshToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);
