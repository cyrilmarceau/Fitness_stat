import React, { createContext, useContext, useState } from "react";
import _ from "lodash";
import API from "@api";
import { _i18n, setKeyLS, getLS } from "@helpers";
import axios from "axios";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [member, setMember] = useState(null);
    const [loading, setLoading] = useState(null);

    const nonError = {
        success: true,
        error: false,
        message: null,
    };

    const login = async (values) => {
        setLoading(true);

        try {
            const res = await API.login(values);

            if (!_.isNil(res.access_token)) {
                // Save access_token for access member information
                setKeyLS("accessToken", res.access_token);

                // Save refresh_token for automatic connection
                setKeyLS("refreshToken", res.refresh_token);
                setMember(res.user);
                return nonError;
            }
        } catch (err) {
            if (!_.isNil(err.response) && !_.isNil(err.response.status)) {
                switch (err.response.status) {
                    case 400:
                        // eslint-disable-next-line no-case-declarations
                        const res = err.response.data;
                        if (!_.isEmpty(res.non_field_errors)) {
                            return {
                                success: false,
                                error: true,
                                message: _i18n("login", "non_field_errors"),
                            };
                        } else {
                            return {
                                success: false,
                                error: true,
                                message: _i18n("default", "impossible_connexion"),
                            };
                        }
                    default:
                        return {
                            success: false,
                            error: true,
                            message: _i18n("default", "impossible_connexion"),
                        };
                }
            } else {
                return {
                    success: false,
                    error: true,
                    message: _i18n("default", "impossible_connexion"),
                };
            }
        } finally {
            setLoading(false);
        }
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
                login,
                verifyToken,
                refreshToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => useContext(AuthContext);
