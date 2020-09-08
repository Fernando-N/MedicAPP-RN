import { SessionService, HttpClientService } from "..";
import { LogUtil } from "../../utils";

const prefixLogs = "[ParamedicService]";

const getAll = async (page: number) => {
    return get(`paramedic?page=${page}`);
}

const getAllByRegion = async (region: string, page: number) => {
    return get(`paramedic/region/${region}?page=${page}`);
}

const getAllByCommune = async (commune: string, page: number) => {
    return get(`paramedic/commune/${commune}?page=${page}`);
}

const get = async (endpoint: string) => {
    const token = await SessionService.getToken();
    const headers = {Authorization: `bearer ${token}`};

    return await HttpClientService.get(endpoint, headers)
        .then(response => {
            console.log(`${prefixLogs} [getAll] - Obtuve response => [${LogUtil.formatObject(response.data)}]`)
            return {success: true, data: response.data};
        })
        .catch(error => {
            console.log(`${prefixLogs} [getAll] - Obtuve error => [${LogUtil.formatObject(error.data)}]`)
            if (error.response && error.response.data) {
                return {success: false, error: error.response.data};
            } else {
                return {success: false, error: 'Estamos sufriento un error en nuestro servicio, porfavor reintente mas tarde.'};
            }
        });
}

const getStatsOfUserId = async (userId: string) => {
    const token = await SessionService.getToken();
    const headers = {Authorization: `Bearer ${token}`};

    return await HttpClientService.get(`paramedic/${userId}/stats`, headers)
        .then(response => {
            console.log(`${prefixLogs} [getStats] - Obtuve response => [${LogUtil.formatObject(response.data)}]`);
            return {success: true, data: response.data};
        })
        .catch(error => {
            if (error.response && error.response.data) {
                return {success: false, error: error.response.data};
            } else {
                return {success: false, error: 'Estamos sufriento un error en nuestro servicio, porfavor reintente mas tarde.'};
            }
        })
}

export const ParamedicService = {
    getAll,
    getAllByRegion,
    getAllByCommune,
    getStatsOfUserId,
}
