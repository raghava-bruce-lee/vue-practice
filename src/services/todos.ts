import axiosInstance from './shared/axiosInstance';
import type { Todo, TODO_STATUS } from '@/models/todo';

export const fetchTodosWithApi = async (): Promise<Todo[] | null> => {
  try {
    const { data } = await axiosInstance.get('/todos');
    return data.todos;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
};

export const createTodoWithApi = async (
  title: string,
  description: string,
  status: TODO_STATUS
): Promise<Todo | null> => {
  try {
    const { data } = await axiosInstance.post('/todos', { title, description, status });
    return data.todo;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
};

export const updateTodoWithApi = async (
  id: string,
  title: string,
  description: string,
  status: TODO_STATUS
): Promise<Todo | null> => {
  try {
    const { data } = await axiosInstance.put(`/todos/${id}`, { title, description, status });
    return data.todo;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
};

export const deleteTodoWithApi = async (id: string): Promise<boolean | null> => {
  try {
    const { status } = await axiosInstance.delete(`/todos/${id}`);
    return status === 200;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
};
