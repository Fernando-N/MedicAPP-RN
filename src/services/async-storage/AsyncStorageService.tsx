import AsyncStorage from '@react-native-community/async-storage';
import qs from 'querystring';
import {LogUtil} from "../../utils";

const prefixLogs = "[AsynStorageService]";

const getItem = async (key) => {
    try {
        let result = await AsyncStorage.getItem(key);
        console.log(`${prefixLogs} [getItem] Recupere [${key}] => [${LogUtil.formatObject(result)}]`)
        return qs.parse(result);
    } catch (e) {
        console.log(`${prefixLogs} [getItem] Error al recuperar [${key}] => [${LogUtil.formatObject(e)}]`)
        throw e;
    }
}

const setItem = async (key, value) => {
    try {
        const item = qs.stringify(value);
        console.log(`${prefixLogs} [setItem] Guardando [${key}] => [${LogUtil.formatObject(value)}]`)
        return await AsyncStorage.setItem(key, item);
    } catch (e) {
        console.log(`${prefixLogs} [setItem] Error al recuperar [${key}] => [${LogUtil.formatObject(e)}]`)
        throw e;
    }
}

const removeItem = async (key) =>{
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.log(`Error en AsynStorage: ${e}`)
        throw e;
    }
}

export const AsyncStorageService = {
    getItem,
    setItem,
    removeItem
};
