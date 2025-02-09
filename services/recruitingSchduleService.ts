import apiClient from '@/services/apiClient';
import { Session } from '@/app/home/_local/types';

export default function recruitingSchduleService() {
  const getCurrent = async () => {
    try {
      const resp = await apiClient.get<Session>("/countdown")
      return resp.data
    }
    catch (error) {
      throw error
    }
  }

  return {
    getCurrent,
  }
}

