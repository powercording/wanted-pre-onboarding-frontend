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
  id?: number;
}

type RequsetType = AxiosRequestConfig;

export default function useTodoList() {
  const [list, setList] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>();
  const [apiResponse, setApiResponse] = useState<Response>();

  useEffect(() => {
    const header = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

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

  const generateRequest = ({ method, id, body }: Mutate) => {
    const request: RequsetType = {
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

  const mutate = async (args: Mutate) => {
    const { method, id } = args;
    let result: AxiosResponse;

    const request = generateRequest(args);
    try {
      result = await axios(request);

      const { status } = result;

      if (status === 200 || status === 201) {
        setApiResponse({ response: result, method });
      }
      if (status === 204) {
        setApiResponse({ response: result, method, id });
      }
    } catch (axiosError) {
      if (axiosError instanceof AxiosError) {
        setError(axiosError.message);
      }
    }
  };

  const handlePost = (todoResponse: Todo) => {
    setList(prev => [...prev, todoResponse]);
  };

  const handleDelete = (id: number) => {
    const index = list.findIndex(todo => todo.id === id);
    const copyList = [...list];
    copyList.splice(index, 1);

    setList(() => copyList);
  };

  const handlePut = (todoResponse: Todo) => {
    const index = list.findIndex(todo => todo.id === todoResponse.id);
    const copyList = [...list];
    copyList[index] = { ...todoResponse };

    setList(() => copyList);
  };

  useEffect(() => {
    if (apiResponse) {
      const { method, response, id } = apiResponse;

      switch (method) {
        case 'DELETE':
          if (id) handleDelete(id);
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
  }, [apiResponse, mutate]);

  useEffect(() => {
    if (error) {
      alert(error);
      setError(null);
    }
  }, [error]);

  return [list, mutate] as const;
}
