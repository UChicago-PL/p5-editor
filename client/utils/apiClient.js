import axios from 'axios';

import getConfig from './getConfig';

import { devPort } from '../../webpack/constants';

// In development, the frontend files are served from a different host to allow for HMR
export const ROOT_URL = process.env.NODE_ENV === 'development'
  ? `localhost:${devPort}${getConfig('API_URL')}`
  : getConfig('API_URL');

/**
 * Configures an Axios instance with the correct API URL
 */
function createClientInstance() {
  return axios.create({
    baseURL: ROOT_URL,
    withCredentials: true
  });
}

export default createClientInstance();
