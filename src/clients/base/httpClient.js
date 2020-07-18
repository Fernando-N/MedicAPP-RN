import axios from 'axios';
const qs = require('querystring')

const urlBase = 'http://192.168.1.97:8080';

const readUrl = (url = '') =>
  url.startsWith('http://') || url.startsWith('https://')
    ? url
    : `${urlBase}/${url}`;

const get = (url = '', headers = {}) => {

    console.log(`[HttpClient] GET REQUEST: ${readUrl(url)} | Headers: [${qs.stringify(headers)}]`)

  return axios.get(readUrl(url), {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
  })
};

const post = (url = '', body = {}, headers = {}) => {
    console.log(`[HttpClient] POST REQUEST: ${readUrl(url)} | Body [${qs.stringify(body)}] | Headers: [${qs.stringify(headers)}]`)

    return axios.post(readUrl(url), qs.stringify(body), {
        headers: {
            Accept: 'application/json',
            ...headers,
        }
    })
};

const put = (url = '', body = {}, headers = {}) => {
    console.log(`[HttpClient] PUT REQUEST: ${readUrl(url)} | Body [${qs.stringify(body)}] | Headers: [${qs.stringify(headers)}]`)

    return axios.put(readUrl(url), body, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...headers,
        },
    });

}

const del = (url = '', headers = {}) => {
    console.log(`[HttpClient] DELETE REQUEST: ${readUrl(url)} | Headers: [${qs.stringify(headers)}]`)

    return axios.delete(readUrl(url), {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...headers,
        },
    });
}

export default {
  get,
  post,
  put,
  delete: del,
};
