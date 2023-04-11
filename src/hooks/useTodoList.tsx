import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import CONST from '../lib/CONSTANT.ts';

interface TodoList {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export default function useTodoList() {
  const [list, setList] = useState<TodoList[]>();
  const [error, setError] = useState<string | null>();

  const header = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  useEffect(() => {
    const getTodos = async () => {
      try {
        const result = await axios.get<TodoList[]>(
          `${CONST.API}${CONST.TODOS}`,
          header,
        );
        if (result.status === 200) {
          setList(result.data);
        }
      } catch (axiosError) {
        if (axiosError instanceof AxiosError) {
          setError(axiosError.message);
        }
      }
    };
    getTodos();
  }, []);

  return [list, setList, error] as const;
}
