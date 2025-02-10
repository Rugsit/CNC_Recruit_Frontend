import apiClient from '@/services/apiClient';
import { Session } from '@/app/home/_local/types';
import { RESPONSE_LIMIT_DEFAULT } from 'next/dist/server/api-utils';
import axios from 'axios';

export default function recruitingSchduleService() {
  const getCurrent = async () => {
    try {
      let resp = await apiClient.get<Session>("/countdown")
      if (resp.data.status == "complete") {
        await apiClient.patch(`/admin/schedule/${resp.data.id+1}`)
        resp = await apiClient.get<Session>("/countdown")
        return resp.data
      }
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

