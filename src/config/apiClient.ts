import axios from 'axios';
import qs from 'qs';

const apiClient = axios.create({
    baseURL: 'https://api.comprea.com/v7',
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'comma' }),
});

export default apiClient;
