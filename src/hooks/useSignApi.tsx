import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

interface SignResponse {
  /* eslint-disable camelcase */
  access_token: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}

export default function useSignApi(url: string) {
  // 변수명 data 바꾸기.
  const [data, setData] = useState<number | null>(null);
  const [error, setError] = useState<AxiosError<ErrorResponse>>();

  useEffect(() => {
    if (error) {
      alert(error.response?.data.message);
      // 이펙트에서 셋 함수 쓰지 않기.
      setError(undefined);
    }
  }, [error]);

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
        setError(axiosError);
      }
    }
  };

  return [fn, data] as const;
}
