import { useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';

interface SigninResponse {
  /* eslint-disable no-restricted-globals */
  status: number;
}

export default function useSignup(url: string) {
  const [data, setData] = useState<SigninResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fn = async function fetchFN(form: FormData, method: 'POST') {
    const axiosPostHeader = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const request = await axios.post<AxiosResponse<SigninResponse>>(
        url,
        form,
        axiosPostHeader,
      );
      const result = request.data;
      if (result.status === 201) setData(result);
    } catch (axiosError) {
      if (axiosError instanceof AxiosError) {
        setError(axiosError.message);
      }
    }
  };

  return [fn, data, error] as const;
}
