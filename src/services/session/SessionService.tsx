import {AsyncStorageService, AuthService, NavigationService, HttpClientService} from '..';

const jwt_decode = require('jwt-decode');

//todo agregar logs
const prefixLogs = "[SesionService]";

const getToken = async () => {
    const res = await AsyncStorageService.getItem('userInfo');
    if (res && res.access_token) {
        const token = jwt_decode(res.access_token);
        const isExpired = isTokenExpired(token);

        if (isExpired) {
            await AuthService.logout();
            NavigationService.navigate('NoAuthNavigator')
        } else {
            return res.access_token;
        }
    }

    NavigationService.navigate('NoAuthNavigator')
}

const isUserLoggedIn = async () => {
    const token = await getToken();
    if (token === undefined) return false;

    const tokenDecrypted = jwt_decode(token);
    const isTokenExpiredResult = isTokenExpired(tokenDecrypted);

    console.log(`${prefixLogs} [isUserLoggedIn] result => ${!isTokenExpiredResult}`)

    return !isTokenExpiredResult;
}

const isTokenExpired = (token) => {
    const expiry = token.exp;
    return Date.now() >= expiry * 1000;
}

const getClaim = async (claim: string) => {
    const res = await AsyncStorageService.getItem('userInfo');
    return res[claim] ? res[claim] : undefined;
}

const getUserName = async () => {
    const token = await getToken();
    const tokenDecrypt = jwt_decode(token);
    return `${tokenDecrypt.FIRST_NAME} ${tokenDecrypt.LAST_NAME}`;
}

const getUserImage = async (id?) => {
    const token = await getToken();
    const headers = {Authorization: `Bearer ${token}`};

    if (!id) {
        id = await getClaim('USER_ID');
    }

    return await HttpClientService.get(`user/profile-image/${id}`, headers)
        .then(response => {
            return response.data.content;
        })
        .catch(error => {
            if (error.response && error.response.data) {
                return {success: false, error: error.response.data};
            } else {
                return {success: false, error: 'Estamos sufriento un error en nuestro servicio, porfavor reintente mas tarde.'};
            }
        });
}

const getUserInfo = async () => {
    const token = await getToken();
    const tokenDecrypt = jwt_decode(token);
    const profileImageUri = await getUserImage(tokenDecrypt.USER_ID);
    return {
        userId: tokenDecrypt.USER_ID,
        name: `${tokenDecrypt.FIRST_NAME} ${tokenDecrypt.LAST_NAME}`,
        email: tokenDecrypt.EMAIL,
        photo: profileImageUri
    }
}

export const SessionService = {
    isUserLoggedIn,
    getUserName,
    getUserInfo,
    getUserImage,
    getToken,
    getClaim,
}
