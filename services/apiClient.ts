'use client';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    // Authorization:
    //   `Bearer ${data?.backendToken}`,
    Accept: 'application/json',
  },
});

export default apiClient;
