//Import de dependencias
import AsyncStorage from '@react-native-community/async-storage';
import httpClient from '../base/httpClient';
import base64 from 'react-native-base64'
import qs from 'querystring';
const jwt_decode = require('jwt-decode');

const prefixLogs = "[AuthService]";


const login = async (email, password) => {
    const appUserB64 = base64.encode('medicapp:12345');
    const body = {username: email, password: password, grant_type: 'password'}
    const headers = {Authorization: `Basic ${appUserB64}`, 'Content-Type': 'application/x-www-form-urlencoded'};

    return await httpClient.post('auth/login', body, headers)
        .then(response => {
            console.log(`${prefixLogs} [login] - Obtuve respuesta => [${qs.stringify(response)}]`)
            AsyncStorage.setItem('userInfo', qs.stringify(response.data));
            return {success: true, error: ''};
        })
        .catch(error => {
            console.log(`${prefixLogs} [login] - Obtuve error => [${qs.stringify(error)}]`)
            if (error.response && error.response.data.error_description === 'Bad credentials') {
                return {success: false, error: '¡Usuario o contraseña incorrecto!'};
            } else {
                return {success: false, error: 'Estamos sufriento un error en nuestro servicio, porfavor reintente mas tarde.'};
            }
        });
}

const forgotPassword = (email: string) => {
    httpClient.post('auth/forgot', {'email': email, 'Content-Type': 'application/x-www-form-urlencoded'});
}

const logout = async () => {
    await AsyncStorage.removeItem('userInfo').catch(error => console.log(`${prefixLogs} [logout] - Obtuve error => [${qs.stringify(error)}]`));
}

const getToken = async () => {
    const res = qs.parse(await AsyncStorage.getItem('userInfo'));
    return res.access_token ? res.access_token : undefined;
}

const isLoggedIn = (navigation) => {
    AsyncStorage.getItem('userInfo').then((response) => {

        if (response) {
            const tokenDecrypt = jwt_decode(response);
            console.log(tokenDecrypt)
            const tokenExpired = isTokenExpired(tokenDecrypt)

            console.log(`[AuthService] [isLoggedIn] - IsTokenExpired: ${tokenExpired}`)

            navigation.reset({
                routes: [{name: !tokenExpired ? 'AuthNavigator' : 'NoAuthNavigator'}]
            });
        }else {
            navigation.reset({
                routes: [{name: 'NoAuthNavigator'}]
            });
        }
    })
        .catch(error => {
            console.log(`${prefixLogs} [isLogeddIn] - Obtuve error => [${qs.stringify(error)}]`)
            navigation.reset({
                routes: [{name: 'NoAuthNavigator'}]
            });
        });
}

const isTokenExpired = (token) => {
    if (token) {
        const expiry = token.exp;
        console.log(`[AuthService] [isTokenExpired] - expiry: ${expiry}`)
        const now = new Date();
        console.log(`[AuthService] [isTokenExpired] - now: ${now}`)
        return now.getTime() > expiry * 1000;
    }
    return false;
}

const getUserName = async (setName) => {
    const token = await getToken();
    const tokenDecrypt = jwt_decode(token);
    setName(tokenDecrypt.FIRST_NAME + ' ' + tokenDecrypt.LAST_NAME);
}

const getUserId = async () => {
    const res = qs.parse(await AsyncStorage.getItem('userInfo'));
    return res.USER_ID;
}

const getUserImage = async (id) => {

    const token = await getToken();

    const headers = {
        Authorization: `Bearer ${token}`,
    };

    return await httpClient.get(`user/profile-image/${id}`, headers)
        .then(response => {
            return response.data.content;
        })
        .catch(error => {
            if (error.response && error.response.data.error_description === 'Bad credentials') {
                return {success: false, error: '¡Usuario o contraseña incorrecto!'};
            } else {
                return {success: false, error: 'Estamos sufriento un error en nuestro servicio, porfavor reintente mas tarde.'};
            }
        });
}

const getUserInfo = (setUserInfo) => {
    AsyncStorage.getItem('userInfo', function (err, value) {
        const tokenDecrypt = jwt_decode(value);

        httpClient.get(`user/profile-image/${tokenDecrypt.USER_ID}`)
            .then(response => {
                console.log(`${prefixLogs} [getUserInfo] - Obtuve respuesta => [${qs.stringify(response)}]`)
                setUserInfo(
                    {
                        userId: tokenDecrypt.USER_ID,
                        name: `${tokenDecrypt.FIRST_NAME} ${tokenDecrypt.LAST_NAME}`,
                        email: tokenDecrypt.EMAIL,
                        photo: response.data.content
                    })
            })
            .catch(error => {
                console.log(`${prefixLogs} [getUserInfo] - Obtuve error => [${qs.stringify(error)}]`)
                if (error.response && error.response.data.error_description === 'Bad credentials') {
                    return {success: false, error: '¡Usuario o contraseña incorrecto!'};
                } else {
                    return {success: false, error: 'Estamos sufriento un error en nuestro servicio, porfavor reintente mas tarde.'};
                }
            });

    });
}

export const AuthService = {
    login,
    logout,
    forgotPassword,
    isLoggedIn,
    getUserName,
    getUserInfo,
    getToken,
    getUserId,
}
