import axios from 'axios';

const client = axios.create({
  baseURL: '/api',
});

export const makeRequest = async ({ url, method = 'GET', data }) =>
  (await client({ url, method, data })).data;
