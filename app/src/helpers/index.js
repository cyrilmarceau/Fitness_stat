import AsyncStorage from "@react-native-async-storage/async-storage";
import errorJSON from "@i18n/fr.json";
import _, { forEach } from "lodash";

const _i18n = (key, codeError) => errorJSON[key][codeError];

const getLS = async (key) => {
    try {
        const value = await AsyncStorage.getItem(`@${key}`);
        if (_.isObject(value)) {
            return JSON.parse(value);
        } else {
            return value;
        }
    } catch (e) {
        // read error
    }
};

const setKeyLS = async (key, value) => {
    try {
        if (_.isObject(value)) {
            await AsyncStorage.setItem(`@${key}`, JSON.stringify(value));
        } else {
            await AsyncStorage.setItem(`@${key}`, value);
        }
    } catch (e) {
        // saving error
    }
};

const removekeyLS = async (key) => {
    try {
        return await AsyncStorage.removeItem(`@${key}`);
    } catch (e) {
        // remove error
    }
};

const removeKeysLS = async (keys) => {
    let keysToDelete = [];

    keys.forEach((el) => keysToDelete.push(`@${el}`));
    try {
        await AsyncStorage.multiRemove(keysToDelete);
    } catch (e) {
        // remove error
    }
};
export { _i18n, getLS, setKeyLS, removekeyLS, removeKeysLS };
