import { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import CONST from '../lib/CONSTANT.ts';

interface Todo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

interface Mutate {
  method: 'POST' | 'PUT' | 'DELETE';
  id?: number;
  body?: FormData;
}

interface Response {
  apiResponse: AxiosResponse;
  method: 'POST' | 'PUT' | 'DELETE';
}

export default function useTodoList() {
  const [list, setList] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>();
  const [apiResponse, setApiResponse] = useState<Response>();

  const header = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };

  useEffect(() => {
    const getTodos = async () => {
      try {
        const result = await axios.get<Todo[]>(
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

  useEffect(() => {
    if (error) {
      alert(error);
      setError(null);
    }
  }, [error]);

  const generateRequest = ({ method, id, body }: Mutate) => {
    const request: AxiosRequestConfig = {
      method,
      url: id
        ? `${CONST.API}${CONST.TODOS}/${id}`
        : `${CONST.API}${CONST.TODOS}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    if (body) {
      request.data = body;
    }

    return request;
  };

  const handlePost = (todoResponse: Todo) => {
    setList(prev => [...prev, todoResponse]);
  };

  // const handleDelete = (id: number) => {
  //   const index = list.findIndex(todo => todo.id === id);
  //   const copyList = [...list];
  //   copyList.splice(index, 1);

  //   setList(copyList);
  // };

  // const handlePut = (todoResponse: Todo) => {
  //   const index = list.findIndex(todo => todo.id === todoResponse.id);
  //   const copyList = [...list];
  //   copyList[index] = { ...todoResponse };

  //   setList(copyList);
  // };

  const mutate = async (args: Mutate) => {
    const { method } = args;
    let result;

    const request = generateRequest(args);
    try {
      result = await axios(request);
      if (result.status === (200 | 201 | 240))
        setApiResponse({ apiResponse: result, method });
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message);
      }
    }

    // Todo: 메소드에 따른 함수호출 설정 ?  useEffect ?
  };

  return [list, setList, mutate] as const;
}
