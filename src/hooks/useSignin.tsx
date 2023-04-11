import { useState } from 'react';
import axios, { AxiosError } from 'axios';

export default function useSignin(url: string) {
  const [data, setData] = useState<number | string | null>(null);
  const [error, setError] = useState<string | null>(null);

  interface SigninResponse {
    access_token: string;
  }

  const fn = async function fetchFN(form: FormData, method: 'POST') {
    const axiosPostHeader = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post<SigninResponse>(
        url,
        form,
        axiosPostHeader,
      );

      if (response.status === 200) {
        localStorage.setItem('token', response.data.access_token);

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
