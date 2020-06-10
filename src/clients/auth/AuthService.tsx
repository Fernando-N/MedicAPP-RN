import AsyncStorage from '@react-native-community/async-storage';
import httpClient from '../base/httpClient';
import base64 from 'react-native-base64'
import qs from 'querystring';
const jwt_decode = require('jwt-decode');

const login = async (email, password) => {
    const endpoint = 'auth/login';
    const appUserB64 = base64.encode('medicapp:12345');

    const body = {
        username: email,
        password: password,
        grant_type: 'password',
    }

    const headers = {
        Authorization: `Basic ${appUserB64}`,
        'Content-Type': 'application/x-www-form-urlencoded',
    };

    return await httpClient.post(endpoint, body, headers)
        .then(response => {
            AsyncStorage.setItem('userInfo', qs.stringify(response.data));
            return {success: true, error: ''};
        })
        .catch(error => {
            if (error.response && error.response.data.error_description === 'Bad credentials') {
                return {success: false, error: '¡Usuario o contraseña incorrecto!'};
            } else {
                return {success: false, error: 'Error al autenticar, reintente mas tarde.'};
            }
        });

}

const logout = async () => {
    await AsyncStorage.removeItem('userInfo').then(error => console.log(error));
}

const getToken = async () => {
    const res = qs.parse(await AsyncStorage.getItem('userInfo'));
    return res.access_token;
}

const isLoggedIn = (setIsUserLoggedIn) => {
    AsyncStorage.getItem('userInfo', function (err, value) {
        setIsUserLoggedIn(!!value);
    });
}

const getUserName = async (setName) => {
    const token = await getToken();
    const tokenDecrypt = jwt_decode(token);
    setName(tokenDecrypt.FIRST_NAME + ' ' + tokenDecrypt.LAST_NAME);
}

export const AuthService = {
    login,
    logout,
    isLoggedIn,
    getUserName,
}
