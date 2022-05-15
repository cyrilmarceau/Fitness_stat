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
        } catch (error) {
            console.log('error upload', error)
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
