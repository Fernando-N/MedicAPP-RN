import { SessionService, HttpClientService } from "../";
import { LogUtil } from "../../utils";

const prefixLogs = "[ChatService]";

const get = async (endpoint: string) => {
    const token = await SessionService.getToken();
    const headers = {Authorization: `bearer ${token}`};

    return await HttpClientService.get(endpoint, headers)
        .then(response => {
            console.log(`${prefixLogs} [get] [${endpoint}] - Obtuve respuesta => [${LogUtil.formatObject(response.data)}]`)
            return {success: true, data: response.data};
        })
        .catch(error => {
            console.log(`${prefixLogs} [get] [${endpoint}] - Obtuve error => [${LogUtil.formatObject(error.data)}]`)
            if (error.response && error.response.data) {
                return {success: false, error: error.response.data};
            } else {
                return {success: false, error: 'Estamos sufriento un error en nuestro servicio, porfavor reintente mas tarde.'};
            }
        });
}

const getAll = async () => {
    return get('chat/messages/get');
}

const getAllWithUserId = async (userId: string) => {
    return get(`chat/messages/get/${userId}`)
}

export const ChatService = {
    getAll,
    getAllWithUserId
}
