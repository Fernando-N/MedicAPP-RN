import axios from 'axios';
const qs = require('querystring')

const urlBase = 'http://192.168.1.97:8080';

const readUrl = (url = '') =>
  url.startsWith('http://') || url.startsWith('https://')
    ? url
    : `${urlBase}/${url}`;

const get = (url = '', headers = {}) =>
  axios.get(readUrl(url), {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
  });

const post = (url = '', body = {}, headers = {}) =>
  axios.post(readUrl(url), qs.stringify(body), {
    headers: {
      Accept: 'application/json',
      ...headers,
    }
  });

const put = (url = '', body = {}, headers = {}) =>
  axios.put(readUrl(url), body, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
  });

const del = (url = '', headers = {}) =>
  axios.delete(readUrl(url), {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
  });

export default {
  get,
  post,
  put,
  delete: del,
};
