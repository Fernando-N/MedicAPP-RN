import httpClient from '../base/httpClient';
import {AuthService} from "../auth/AuthService";
const qs = require('querystring')

const getNationalities = (setNationalities) => {
    httpClient.get('nationality')
        .then(response => {
            setNationalities(response.data);
        })
        .catch(error => {
            console.error(error)
            setNationalities([{value: null, label: ''}]);
        });
}

const getRegions = (setRegions) => {
    httpClient.get('region')
        .then(response => {
            setRegions(response.data);
        })
        .catch(error => {
            console.error(error)
            setRegions([{value: null, label: ''}]);
        });
}

const getCommunes = (id: string, setCommunes) => {
    httpClient.get(`region/${id}/communes`)
        .then(response => {
            setCommunes(response.data);
        })
        .catch(error => {
            console.error(error);
            setCommunes([{value: null, label: ''}]);
        })
}
const getLogitudeAndLatitude = async (address: string) => {
    const token = await AuthService.getToken();

    const headers = {Authorization: `Bearer ${token}`};

    return await httpClient.get(`location/${encodeURI(address.replace('#', ''))}/`, headers)
        .then(response => {
            return {error: false, data: response.data};
        })
        .catch(error => {
            console.error(error);
            return {error: true, data: undefined};
        })
}

export const UtilService = {
    getNationalities,
    getRegions,
    getCommunes,
    getLogitudeAndLatitude
}
