import axios from 'axios';
import { host } from "../../core/environment";
import {LogUtil} from "../../utils";

const readUrl = (url = '') =>
  url.startsWith('http://') || url.startsWith('https://')
    ? url
    : `${host}/${url}`;

const get = (url = '', headers = {}) => {

    console.log(`[HttpClient] GET REQUEST: ${readUrl(url)} | Headers: [${LogUtil.formatObject(headers)}]`)

    return axios.get(readUrl(url), {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...headers,
        },
    })
};

const post = (url = '', body = {}, headers = {}) => {
    console.log(`[HttpClient] POST REQUEST: ${readUrl(url)} | Body [${LogUtil.formatObject(body)}] | Headers: [${LogUtil.formatObject(headers)}]`)

    return axios.post(readUrl(url), body, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...headers,
        }
    })
};

const put = (url = '', body = {}, headers = {}) => {
    console.log(`[HttpClient] PUT REQUEST: ${readUrl(url)} | Body [${LogUtil.formatObject(body)}] | Headers: [${LogUtil.formatObject(headers)}]`)

    return axios.put(readUrl(url), body, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...headers,
        },
    });

}

const del = (url = '', headers = {}) => {
    console.log(`[HttpClient] DELETE REQUEST: ${readUrl(url)} | Headers: [${LogUtil.formatObject(headers)}]`)

    return axios.delete(readUrl(url), {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...headers,
        },
    });
}

export const HttpClientService = {
  get,
  post,
  put,
  delete: del,
};
