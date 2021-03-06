import axios from 'axios'

const API_HOST = process.env.REACT_APP_API_URL

const getUrl = endpoint => API_HOST + endpoint

export const post = async (endpoint, data, jwt) => {
  const headers = buildHeaders(jwt)
  return axios.post(getUrl(endpoint), data, {headers: headers})
}

export const get = async (endpoint, jwt, params = {}) => {
  const headers = buildHeaders(jwt)
  return axios.get(getUrl(endpoint), {headers: headers, params: params})
}

export const put = async (endpoint, data, jwt) => {
  const headers = buildHeaders(jwt)
  return axios.put(getUrl(endpoint), data, {headers: headers})
}

export const del = async (endpoint, jwt) => {
  const headers = buildHeaders(jwt)
  return axios.delete(getUrl(endpoint), {headers: headers})
}

const buildHeaders = (jwt) => {
  let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
  }

  if (jwt) {
    headers['authorization'] = `Token ${jwt}`;
  }

  return headers
}
