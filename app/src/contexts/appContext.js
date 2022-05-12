import React, { createContext, useContext, useState } from "react";
import _ from "lodash";
import API from "@api";
import { _i18n, setKeyLS, getLS, removeKeysLS } from "@helpers";
import axios from "axios";


const AppContext = createContext({});

export const AppProvider = ({ children }) => {

    const uploadAvatar = async (file) => {
        try {
            const res = await API.uploadAvatar(file);
            console.log('res', res)
            // if (detail === "Successfully logged out.") {
            //     await removeKeysLS(["accessToken", "refreshToken"]);
            //     setIsAuth(false);
            //     return nonError;
            // }
        } catch (error) {
            console.log('error upload', error.response.data)
        }
    };

    return (
        <AppContext.Provider value={{
            uploadAvatar
        }}>
            {children}
        </AppContext.Provider>
    )
};
export const useApp = () => useContext(AppContext);
