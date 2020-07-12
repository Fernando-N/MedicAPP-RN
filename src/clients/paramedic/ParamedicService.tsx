import AsyncStorage from '@react-native-community/async-storage';
import httpClient from '../base/httpClient';
import {AuthService} from "../auth/AuthService";
import qs from 'querystring';

const getAll = async () => {
    const endpoint = 'user/paramedic';

    const token = await AuthService.getToken();

    const headers = {
        Authorization: `bearer ${token}`,
    };

    console.log('Ejecutando httpClient')

    return await httpClient.get(endpoint, headers)
        .then(response => {
            console.log(`Obtuve respuesta: ${response}`)
            return {success: true, data: response.data};
        })
        .catch(error => {
            console.log(`Error: ${error}`)
            if (error.response && error.response.data.error_description === 'Bad credentials') {
                return {success: false, error: '¡Usuario o contraseña incorrecto!'};
            } else {
                return {success: false, error: 'Estamos sufriento un error en nuestro servicio, porfavor reintente mas tarde.'};
            }
        });

}

export const ParamedicService = {
    getAll,
}
