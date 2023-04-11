import { useState } from 'react';
import axios, { AxiosError } from 'axios';

interface SignResponse {
  access_token: string;
}

export default function useSignApi(url: string) {
  const [data, setData] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fn = async (form: FormData, method: 'POST') => {
    const header = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post<SignResponse>(url, form, header);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.access_token);
        setData(response.status);
      }
      if (response.status === 201) {
        setData(response.status);
      }
    } catch (axiosError) {
      if (axiosError instanceof AxiosError) {
        setError(axiosError.message);
      }
    }
  };

  return [fn, data, error] as const;
}
