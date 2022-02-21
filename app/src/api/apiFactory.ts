import axios from "axios";

import { IFormsignupInputs } from "@utils/interfaces";

const APP_ROUTE_PRE = "api/app/";

const that = {
    getAxiosInstence() {
        const reqHeaders = {
            "Content-type": "Application/json",
            "Accept": "Application/json",
        };

        // if (autenticatedRoute === true) {
        //     const auth_token = getAuthTokenInLocalStorage();
        //     reqHeaders.Authorization = `Token ${auth_token}`;
        // }

        return axios.create({
            baseURL: process.env.PUBLIC_API_FULL_URL,
            // timeout: 1000,
            headers: reqHeaders,
        });
    },

    listRoute<T>(url: string, extraParams: T) {
        const api = that.getAxiosInstence();

        return new Promise((resolve, reject) => {
            api.get(url, { params: extraParams })
                .then((apiResponse) => {
                    resolve(apiResponse);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },

    createRoute<T>(url: string, values: T) {
        const api = that.getAxiosInstence();
        return new Promise((resolve, reject) => {
            api.post(url, values)
                .then((apiResp) => {
                    resolve(apiResp);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },

    createUser(values: IFormsignupInputs) {
        return that.createRoute(`${APP_ROUTE_PRE}users/`, values);
    },
    getUsers(params = {}) {
        return that.listRoute(`${APP_ROUTE_PRE}users/`, params);
    },
};

export default that;
