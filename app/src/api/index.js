import axios from "axios";
import _ from "lodash";
import { getLS } from "@helpers";

const PUBLIC_API_URL = "http://192.168.1.29:9010/";
const APP_ROUTE = "api/app/";

const that = {
    getAxiosInstence(autenticatedRoute = true) {
        let reqHeaders = {
            "Content-type": "Application/json",
            "Accept": "Application/json",
        };

        // if (autenticatedRoute === true) {
        // }
        return axios.create({
            baseURL: PUBLIC_API_URL,
            headers: reqHeaders,
        });
    },

    getRoute(url, extraParams = {}, autenticatedRoute = false) {
        let api = that.getAxiosInstence(autenticatedRoute);
        return new Promise((resolve, reject) => {
            api.get(url, { params: extraParams })
                .then((apiResp) => {
                    let res = apiResp.data;
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },

    postRoute(url, values, autenticatedRoute = false) {
        const api = that.getAxiosInstence(autenticatedRoute);
        return new Promise((resolve, reject) => {
            api.post(url, values)
                .then((apiResp) => {
                    resolve(apiResp.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },

    login(values) {
        if (_.isNil(values)) return Promise.reject(new Error("ERR_EMPTY_PARAM"));
        return that.postRoute(`${APP_ROUTE}auth/login/`, values, false);
    },
    verifyToken(accessToken) {
        if (_.isNil(accessToken)) return Promise.reject(new Error("ERR_EMPTY_PARAM"));
        return that.postRoute(`${APP_ROUTE}auth/token/verify/`, accessToken, false);
    },
    refreshToken(refreshToken) {
        if (_.isNil(refreshToken)) return Promise.reject(new Error("ERR_EMPTY_PARAM"));
        return that.postRoute(`${APP_ROUTE}auth/token/refresh/`, refreshToken, false);
    },
    me() {
        return that.getRoute(`${APP_ROUTE}auth/user/`, {}, true);
    },
};

export default that;
