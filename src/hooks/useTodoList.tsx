import { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import CONST from '../lib/CONSTANT.ts';

export interface Todo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId?: number;
}

export interface Mutate {
  method: 'POST' | 'PUT' | 'DELETE';
  id?: number;
  body?: FormData | { todo: string; isCompleted: boolean };
}

interface Response {
  response: AxiosResponse<Todo>;
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

  const handleDelete = (id: number) => {
    const index = list.findIndex(todo => todo.id === id);
    const copyList = [...list];
    copyList.splice(index, 1);

    setList(copyList);
  };

  const handlePost = (todoResponse: Todo) => {
    setList(prev => [...prev, todoResponse]);
  };

  const handlePut = (todoResponse: Todo) => {
    const index = list.findIndex(todo => todo.id === todoResponse.id);
    const copyList = [...list];
    copyList[index] = { ...todoResponse };

    setList(copyList);
  };

  const mutate = async (args: Mutate) => {
    const { method } = args;
    let result: AxiosResponse;

    const request = generateRequest(args);
    try {
      result = await axios(request);
      const { status } = result;
      if (status === 200 || status === 201 || status === 204)
        setApiResponse({ response: result, method });
    } catch (axiosError) {
      if (axiosError instanceof AxiosError) {
        setError(axiosError.message);
      }
    }
  };

  useEffect(() => {
    if (apiResponse) {
      const { method, response } = apiResponse;

      switch (method) {
        case 'DELETE':
          handleDelete(response.data.id);
          break;
        case 'POST':
          handlePost(response.data);
          break;
        case 'PUT':
          handlePut(response.data);
          break;
        default:
          break;
      }
    }

    setApiResponse(undefined);
  }, [apiResponse]);

  return [list, setList, mutate] as const;
}
