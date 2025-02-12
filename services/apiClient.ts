'use client';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    // Authorization:
    //   `Bearer ${data?.backendToken}`,
    Accept: 'application/json',
  },
});

export default apiClient;
