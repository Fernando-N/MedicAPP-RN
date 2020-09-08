import {SessionService, HttpClientService} from "..";
import {LogUtil} from "../../utils";

const prefixLogs = "[ProfileService]";

const getProfile = async (userId) => {
    const token = await SessionService.getToken();

    const headers = {Authorization: `Bearer ${token}`};

    return await HttpClientService.get(`user/${userId}`, headers)
        .then(response => {
            console.log(`${prefixLogs} [getProfile] - Obtuve respuesta => [${LogUtil.formatObject(response.data)}]`)
            return {success: true, data: response.data};
        })
        .catch(error => {
            console.log(`${prefixLogs} [getProfile] - Obtuve error => [${LogUtil.formatObject(error)}]`)
            if (error.response && error.response.data) {
                return {success: false, error: error.response.data};
            } else {
                return {success: false, error: 'Estamos sufriento un error en nuestro servicio, porfavor reintente mas tarde.'};
            }
        });
}

const reportProfile = async (userId, message) => {
    const token = await SessionService.getToken();

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };

    const body = {
        toUserId: userId,
        message: message
    }

    return await HttpClientService.post('report', body, headers)
        .then(response => {
            console.log(`${prefixLogs} [reportProfile] - Obtuve respuesta => [${LogUtil.formatObject(response.data)}]`)
            return {success: true, data: response.data};
        })
        .catch(error => {
            console.log(`${prefixLogs} [reportProfile] - Obtuve error => [${LogUtil.formatObject(error.data)}]`)
            if (error.response && error.response.data) {
                return {success: false, error: error.response.data};
            } else {
                return {success: false, error: 'Estamos sufriento un error en nuestro servicio, porfavor reintente mas tarde.'};
            }
        });
}

export const ProfileService = {
    getProfile,
    reportProfile,
}
