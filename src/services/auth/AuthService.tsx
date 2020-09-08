import { AsyncStorageService, HttpClientService } from "../";
import { LogUtil } from "../../utils";
import base64 from 'react-native-base64'
import qs from 'querystring';
import {User} from "../../models";

const prefixLogs = "[AuthService]";

const login = async (email, password) => {
    const appUserB64 = base64.encode('medicapp:12345');
    const body = {username: email, password: password, grant_type: 'password'}
    const headers = {Authorization: `Basic ${appUserB64}`, 'Content-Type': 'application/x-www-form-urlencoded'};

    return await HttpClientService.post('auth/login', qs.stringify(body), headers)
        .then(response => {
            console.log(`${prefixLogs} [login] - Obtuve respuesta => [${LogUtil.formatObject(response.data)}]`)
            AsyncStorageService.setItem('userInfo', response.data);
            return {success: true, error: ''};
        })
        .catch(error => {
            console.log(`${prefixLogs} [login] - Obtuve error => [${LogUtil.formatObject(error)}]`)
            if (error.response && error.response.data.error_description === 'Bad credentials') {
                return {success: false, error: '¡Usuario o contraseña incorrecto!'};
            } else {
                return {success: false, error: 'Estamos sufriento un error en nuestro servicio, porfavor reintente mas tarde.'};
            }
        });
}

const register = async (user: User) => {
    const body = {...user}

    return await HttpClientService.post('auth/register', body)
        .then(response => {
            console.log(`${prefixLogs} [register] - Obtuve respuesta => [${LogUtil.formatObject(response.data)}]`)
            AsyncStorageService.setItem('userInfo', response.data);
            return {success: true, error: ''};
        })
        .catch(error => {
            console.log(`${prefixLogs} [register] - Obtuve error => [${LogUtil.formatObject(error.data)}]`)
            if (error.response && error.response.data && error.response.data.details) {
                return {success: false, error: error.response.data.details.toString()};
            } else {
                return {success: false, error: 'Estamos sufriento un error en nuestro servicio, porfavor reintente mas tarde.'};
            }
        });
}

const logout = async () => {
    await AsyncStorageService.removeItem('userInfo');
}

const forgotPassword = (email: string) => {
    HttpClientService.post(`auth/forgot?email=${email}`)
        .then(response => {
            console.log(`${prefixLogs} [forgotPassword] - Obtuve respuesta => [${LogUtil.formatObject(response.data)}]`)
            return {success: true, error: ''};
        })
        .catch(error => {
            console.log(`${prefixLogs} [forgotPassword] - Obtuve error => [${LogUtil.formatObject(error)}]`)
            if (error.response && error.response.data) {
                return {success: false, error: error.response.data};
            } else {
                return {success: false, error: 'Estamos sufriento un error en nuestro servicio, porfavor reintente mas tarde.'
                };
            }
        });
}

const resetPassword = async (token: string, password: string, password2: string) => {

    const body = {
        token: token,
        password: password,
        passwordConfirmation: password2
    }

    return await HttpClientService.post('auth/reset', body)
        .then(response => {
            console.log(`${prefixLogs} [resetPassword] - Obtuve respuesta => [${LogUtil.formatObject(response.data)}]`)
            return {success: true, error: ''};
        })
        .catch(error => {
            console.log(`${prefixLogs} [resetPassword] - Obtuve error => [${LogUtil.formatObject(error)}]`)
            if (error.response && error.response.data) {
                return {success: false, error: error.response.data.details.toString()};
            } else {
                return {success: false, error: 'Estamos sufriento un error en nuestro servicio, porfavor reintente mas tarde.'
                };
            }
        });
}

export const AuthService = {
    login,
    logout,
    register,
    forgotPassword,
    resetPassword
}
