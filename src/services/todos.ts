import axiosInstance from './shared/axiosInstance';
import type { Todo } from '@/models/todo';

export const fetchTodosWithApi = async (): Promise<Todo[] | null> => {
  try {
    const { data } = await axiosInstance.get('/todos');
    return data.todos;
  } catch (error) {
    return null;
  }
};
