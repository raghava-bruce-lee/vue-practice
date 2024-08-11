import axiosInstance from './shared/axiosInstance';

export const fetchTodos = async () => {
  try {
    const { data } = await axiosInstance.get('/todos');
    return data;
  } catch (error) {
    return null;
  }
};
