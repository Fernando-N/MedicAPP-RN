import { SessionService, HttpClientService } from "..";
import { LogUtil } from "../../utils";

const prefixLogs = "[FeedbackService]";

const getAllOfUserId = async (userId: string, page: number) => {
    const token = await SessionService.getToken();
    const headers = {Authorization: `Bearer ${token}`};

    return await HttpClientService.get(`feedback/to/${userId}?page=${page}`, headers)
        .then(response => {
            console.log(`${prefixLogs} [getAllOfUserId] - Obtuve response => [${LogUtil.formatObject(response.data)}]`);
            return { success: true, data: response.data};
        })
        .catch(error => {
            console.log(`${prefixLogs} [getAllOfUserId] - Obtuve error => [${LogUtil.formatObject(error.data)}]`);
            if (error.response && error.response.data) {
                return { success: false, error: error.response.data};
            } else {
                return { success: false, error: 'Estamos sufriento un error en nuestro servicio, porfavor reintente mas tarde.'};
            }
        })
}

const sendFeedback = async (userId, message, anon, rate) => {
    const token = await SessionService.getToken();

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };

    const body = {
        toUserId: userId,
        comment: message,
        anon: anon,
        rate: rate,
    }

    return await HttpClientService.post('feedback', body, headers)
        .then(response => {
            console.log(`${prefixLogs} [sendFeedback] - Obtuve respuesta => [${LogUtil.formatObject(response.data)}]`)
            return {success: true, data: response.data};
        })
        .catch(error => {
            console.log(`${prefixLogs} [sendFeedback] - Obtuve error => [${LogUtil.formatObject(error)}]`)
            if (error.response && error.response.data) {
                return { success: false, error: error.response.data};
            } else {
                return { success: false, error: 'Estamos sufriento un error en nuestro servicio, porfavor reintente mas tarde.'};
            }
        });
}

export const FeedbackService = {
    getAllOfUserId,
    sendFeedback
}
