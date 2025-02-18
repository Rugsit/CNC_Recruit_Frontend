'use client';
import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const apiClient = axios.create({
  baseURL: publicRuntimeConfig.apiUrl,
  headers: {
    'Content-Type': 'application/json',
    // Authorization:
    //   `Bearer ${data?.backendToken}`,
    Accept: 'application/json',
  },
});

export default apiClient;
