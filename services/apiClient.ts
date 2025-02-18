'use client';
import axios from 'axios';
import { env } from 'next-runtime-env';

const apiClient = axios.create({
  baseURL: env('NEXT_PUBLIC_API_URL'),
  headers: {
    'Content-Type': 'application/json',
    // Authorization:
    //   `Bearer ${data?.backendToken}`,
    Accept: 'application/json',
  },
});

export default apiClient;
