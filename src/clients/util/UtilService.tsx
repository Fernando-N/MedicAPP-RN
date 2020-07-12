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
                return {success: false, error: 'Estamos sufriento un error en nuestro servicio, porfavor reintente mas tarde.'};
            }
        });
}

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

const logout = async () => {
    await AsyncStorage.removeItem('userInfo').then(error => console.log(error));
}

const getToken = async () => {
    const res = qs.parse(await AsyncStorage.getItem('userInfo'));
    return res.access_token;
}

const isLoggedIn = (navigation) => {
    AsyncStorage.getItem('userInfo', function (err, value) {
        navigation.reset({
            routes: [{name: !!value ? 'AuthNavigator' : 'NoAuthNavigator'}]
        });
    });
}

const getUserName = async (setName) => {
    const token = await getToken();
    const tokenDecrypt = jwt_decode(token);
    setName(tokenDecrypt.FIRST_NAME + ' ' + tokenDecrypt.LAST_NAME);
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

        const headers = {
            Authorization: `Bearer ${tokenDecrypt.access_token}`,
        };
        console.log(`user/profile-image/${tokenDecrypt.USER_ID}`)

        httpClient.get(`user/profile-image/${tokenDecrypt.USER_ID}`)
            .then(response => {
                 console.log(response.data);
                setUserInfo({name: `${tokenDecrypt.FIRST_NAME} ${tokenDecrypt.LAST_NAME}`, email: tokenDecrypt.EMAIL, photo: response.data.content})
            })
            .catch(error => {
                console.log("ERRORR")
                if (error.response && error.response.data.error_description === 'Bad credentials') {
                    return {success: false, error: '¡Usuario o contraseña incorrecto!'};
                } else {
                    return {success: false, error: 'Estamos sufriento un error en nuestro servicio, porfavor reintente mas tarde.'};
                }
            });

    });
}

export const UtilService = {
    getNationalities,
    getRegions,
    getCommunes
}
