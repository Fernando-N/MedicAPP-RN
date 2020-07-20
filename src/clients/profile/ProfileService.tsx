//Import de dependencias
import httpClient from '../base/httpClient';
import qs from 'querystring';
import {AuthService} from '../auth/AuthService';

const prefixLogs = "[ProfileService]";

const getProfile = async (userId) => {
    const token = await AuthService.getToken();

    const headers = {Authorization: `Bearer ${token}`};

    return await httpClient.get(`user/${userId}`, headers)
        .then(response => {
            console.log(`${prefixLogs} [getProfile] - Obtuve respuesta => [${qs.stringify(response.data)}]`)
            return {success: true, data: response.data};
        })
        .catch(error => {
            console.log(`${prefixLogs} [getProfile] - Obtuve error => [${qs.stringify(error)}]`)
            if (error.response && error.response.data.error_description === 'Bad credentials') {
                return {success: false, error: '¡Usuario o contraseña incorrecto!'};
            } else {
                return {success: false, error: 'Estamos sufriento un error en nuestro servicio, porfavor reintente mas tarde.'};
            }
        });
}

const reportProfile = async (userId, message) => {
    const token = await AuthService.getToken();

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };

    const body = {
        toUserId: userId,
        message: message
    }

    return await httpClient.post('report', body, headers)
        .then(response => {
            console.log(`${prefixLogs} [reportProfile] - Obtuve respuesta => [${qs.stringify(response.data)}]`)
            return {success: true, data: response.data};
        })
        .catch(error => {
            console.log(`${prefixLogs} [reportProfile] - Obtuve error => [${qs.stringify(error)}]`)
            if (error.response && error.response.data.error_description === 'Bad credentials') {
                return {success: false, error: '¡Usuario o contraseña incorrecto!'};
            } else {
                return {success: false, error: 'Estamos sufriento un error en nuestro servicio, porfavor reintente mas tarde.'};
            }
        });
}

export const ProfileService = {
    getProfile,
    reportProfile
}
