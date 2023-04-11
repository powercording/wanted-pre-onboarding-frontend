import { useState } from 'react';
import axios, { AxiosError } from 'axios';

export default function useSignup(url: string) {
  const [data, setData] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fn = async function fetchFN(form: FormData, method: 'POST') {
    const axiosPostHeader = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await axios.post<null>(url, form, axiosPostHeader);

      const result = response.status;
      if (response.status === 201) setData(result);
    } catch (axiosError) {
      if (axiosError instanceof AxiosError) {
        setError(axiosError.message);
      }
    }
  };

  return [fn, data, error] as const;
}
