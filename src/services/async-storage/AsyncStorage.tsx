import qs from 'querystring';

const getItem = (key) => {
    try {
        let result = AsyncStorage.getItem(key);
        return qs.parse(result);
    } catch (e) {
        console.log(`Error en AsynStorage: ${e}`)
        throw e;
    }
}

const setItem = async (key, value) => {
    try {
        const item = qs.stringify(value);
        return await AsyncStorage.setItem(key, item);
    } catch (e) {
        console.log(`Error en AsynStorage: ${e}`)
        throw e;
    }
}

export const AsyncStorage = {
    getItem,
    setItem,
};
