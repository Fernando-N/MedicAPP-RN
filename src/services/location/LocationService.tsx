import {AsyncStorageService, HttpClientService, SessionService} from "..";
import { LogUtil } from "../../utils";

const prefixLogs = '[LocationService]';

const getNationalities = (setNationalities) => {
    HttpClientService.get('nationality')
        .then(response => {
            console.log(`${prefixLogs} [getNationalities] - Obtuve respuesta => [${LogUtil.formatObject(response.data)}]`)
            setNationalities(response.data);
        })
        .catch(error => {
            console.log(`${prefixLogs} [getNationalities] - Obtuve error => [${LogUtil.formatObject(error.data)}]`)
            setNationalities([{value: null, label: ''}]);
        });
}

const getRegions = (setRegions) => {
    HttpClientService.get('region')
        .then(response => {
            console.log(`${prefixLogs} [getRegions] - Obtuve respuesta => [${LogUtil.formatObject(response.data)}]`)
            setRegions(response.data);
        })
        .catch(error => {
            console.log(`${prefixLogs} [getRegions] - Obtuve error => [${LogUtil.formatObject(error.data)}]`)
            setRegions([{value: null, label: ''}]);
        });
}

const getCommunes = (id: string, setCommunes) => {
    HttpClientService.get(`region/${id}/communes`)
        .then(response => {
            console.log(`${prefixLogs} [getCommunes] - Obtuve respuesta => [${LogUtil.formatObject(response.data)}]`)
            setCommunes(response.data);
        })
        .catch(error => {
            console.log(`${prefixLogs} [getCommunes] - Obtuve error => [${LogUtil.formatObject(error.data)}]`)
            setCommunes([{value: null, label: ''}]);
        })
}

const getLogitudeAndLatitude = async (address: string) => {
    const token = await SessionService.getToken();
    const headers = {Authorization: `Bearer ${token}`};

    return await HttpClientService.get(`location/${encodeURI(address.replace('#', ''))}/`, headers)
        .then(response => {
            console.log(`${prefixLogs} [getLogitudeAndLatitude] - Obtuve respuesta => [${LogUtil.formatObject(response.data)}]`)
            return {error: false, data: response.data};
        })
        .catch(error => {
            console.log(`${prefixLogs} [getLogitudeAndLatitude] - Obtuve error => [${LogUtil.formatObject(error.data)}]`)
            return {error: true, data: undefined};
        })
}

const getCommuneFromLatitudeAndLongitude = async (currentLocation) => {
    const token = await SessionService.getToken();
    const headers = {Authorization: `Bearer ${token}`};

    return await HttpClientService.get(`location?latitude=${currentLocation.latitude}&longitude=${currentLocation.longitude}`, headers)
        .then(response => {
            console.log(`${prefixLogs} [getCommuneFromLatitudeAndLongitude] - Obtuve respuesta => [${LogUtil.formatObject(response.data)}]`)
            return {error: false, data: response.data};
        })
        .catch(error => {
            console.log(`${prefixLogs} [getCommuneFromLatitudeAndLongitude] - Obtuve error => [${LogUtil.formatObject(error.data)}]`)
            return {error: true, data: undefined};
        })
}

const getHospitals = async (currentLocation) => {
    const token = await SessionService.getToken();
    const headers = {Authorization: `Bearer ${token}`};

    return await HttpClientService.get(`location/hospitals?latitude=${currentLocation.latitude}&longitude=${currentLocation.longitude}`, headers)
        .then(response => {
            console.log(`${prefixLogs} [getCommuneFromLatitudeAndLongitude] - Obtuve respuesta => [${LogUtil.formatObject(response.data)}]`)
            return {error: false, data: response.data.places};
        })
        .catch(error => {
            console.log(`${prefixLogs} [getCommuneFromLatitudeAndLongitude] - Obtuve error => [${LogUtil.formatObject(error.data)}]`)
            return {error: true, data: undefined};
        })
}

const getDrugstores = async (currentLocation) => {
    const token = await SessionService.getToken();
    const headers = {Authorization: `Bearer ${token}`};

    return await HttpClientService.get(`location/drugstores?latitude=${currentLocation.latitude}&longitude=${currentLocation.longitude}`, headers)
        .then(response => {
            console.log(`${prefixLogs} [getCommuneFromLatitudeAndLongitude] - Obtuve respuesta => [${LogUtil.formatObject(response.data)}]`)
            return {error: false, data: response.data};
        })
        .catch(error => {
            console.log(`${prefixLogs} [getCommuneFromLatitudeAndLongitude] - Obtuve error => [${LogUtil.formatObject(error.data)}]`)
            return {error: true, data: undefined};
        })
}


const setCurrentLocation = (currentLocation) => {
    AsyncStorageService.setItem('currentLocation', currentLocation);
}

const getCurrentLocation = async () => {
    return await AsyncStorageService.getItem('currentLocation');
}

export const LocationService = {
    getNationalities,
    getRegions,
    getCommunes,
    getHospitals,
    getDrugstores,
    getLogitudeAndLatitude,
    getCommuneFromLatitudeAndLongitude,
    setCurrentLocation,
    getCurrentLocation
}
