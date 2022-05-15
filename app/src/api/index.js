import axios from "axios";
import _ from "lodash";
import { Platform } from "react-native";

// Ecole: http://192.168.20.214:9010/
const PUBLIC_API_URL = "http://192.168.1.29:9010/";
const APP_ROUTE = "api/app/";

const that = {
    getAxiosInstence(autenticatedRoute = true) {
        let reqHeaders = {
            // "Content-type": "Application/json",
            // "Accept": "Application/json",
        };

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

    patchRoute(url, values, autenticatedRoute = true) {
        let api = that.getAxiosInstence(autenticatedRoute)

        return new Promise((resolve, reject) => {
            api.patch(url, values)
                .then((apiResp) => {
                    let res = apiResp.data
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
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
    forgetPassword(email) {
        if (_.isNil(email)) return Promise.reject(new Error("ERR_EMPTY_PARAM"));
        return that.postRoute(`${APP_ROUTE}auth/password/reset/`, email, false);
    },
    signup(values) {
        if (_.isNil(values)) return Promise.reject(new Error("ERR_EMPTY_PARAM"));
        return that.postRoute(`${APP_ROUTE}auth/registration/`, values, false);
    },
    passwordChange(values) {
        if (_.isNil(values)) return Promise.reject(new Error("ERR_EMPTY_PARAM"));
        return that.postRoute(`${APP_ROUTE}auth/password/change/`, values, true);
    },
    editMe(values) {
        if (_.isNil(values)) return Promise.reject(new Error("ERR_EMPTY_PARAM"));
        return that.patchRoute(`${APP_ROUTE}auth/user/`, values, true);
    },
    logout() {
        return that.postRoute(`${APP_ROUTE}auth/logout/`, {}, true);
    },
    verifyToken(accessToken) {
        if (_.isNil(accessToken)) return Promise.reject(new Error("ERR_EMPTY_PARAM"));
        return that.postRoute(`${APP_ROUTE}auth/token/verify/`, accessToken, false);
    },
    refreshToken(refreshToken) {
        if (_.isNil(refreshToken)) return Promise.reject(new Error("ERR_EMPTY_PARAM"));
        return that.postRoute(`${APP_ROUTE}auth/token/refresh/`, refreshToken, false);
    },
    uploadAvatar(file) {
        if (_.isNil(file)) return Promise.reject(new Error("ERR_EMPTY_PARAM"));
        let api = that.getAxiosInstence(true)
        let data = new FormData();

        data.append('avatar', {
            name: 'imageCheck',
            type: 'image/jpeg',
            uri: Platform.OS === 'ios' ? file.replace('file://', '') : file,
        });

        
        return new Promise((resolve, reject) => {
            api.post(
                `${APP_ROUTE}upload/`,
                data,
                {
                    'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',

                }
            )
                .then((apiResp) => {
                    let res = apiResp.data
                    resolve(res)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    },
    me() {
        return that.getRoute(`${APP_ROUTE}auth/user/`, {}, true);
    },
    getMuscles() {
        return that.getRoute(`${APP_ROUTE}muscles/`, {}, true);
    },
};

export default that;
