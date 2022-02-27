import axios from "axios";

const that = {
    getAxiosInstence() {
        const reqHeaders = {
            "Content-type": "Application/json",
            "Accept": "Application/json",
        };

        return axios.create({
            baseURL: process.env.PUBLIC_API_FULL_URL,
            // timeout: 1000,
            headers: reqHeaders,
        });
    },

    /**
     * HTTP POST method.
     * @template V - `VALUES`: expected object.
     * @template R - `RESPONSE`: expected promise response success or fail
     * @param {V} values - payload to be send as the `request body`,
     * @param {string} url - endpoint you want to reach.
     * @returns {Promise<R>} - HTTP [axios] response payload.
     */
    postRoute<V, R>(url: string, values: V): Promise<R> {
        const api = that.getAxiosInstence();
        return new Promise((resolve, reject) => {
            api.post(url, values)
                .then((apiResp) => {
                    resolve(apiResp.data);
                })
                .catch((err) => {
                    console.log("error create route", err);
                    reject(err);
                });
        });
    },

    /**
     * Method for create user.
     * @template V - `VALUES`: expected object.
     * @template R - `RESPONSE`: expected promise response success or fail
     * @param {V} values - payload to be send as the `request body`,
     * @returns {Promise<R>} - HTTP [axios] response payload.
     */
    createUser<V, R>(values: V): Promise<R> {
        return that.postRoute<V, R>(`${process.env.APP_ROUTE_PRE}users/`, values);
    },

    loginUser<V, R>(values: V): Promise<R> {
        return that.postRoute<V, R>(`${process.env.APP_ROUTE_PRE}auth/token/login`, values);
    },
};

export default that;
