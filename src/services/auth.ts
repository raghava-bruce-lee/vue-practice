import axiosInstance from './shared/axiosInstance';

export const fetchLoginStatusWithApi = async (): Promise<boolean> => {
  try {
    const { status } = await axiosInstance.get('/auth/login-status');
    return status === 200;
  } catch (error) {
    return false;
  }
};

export const loginWithApi = async (email: string, password: string) => {
  try {
    const { data } = await axiosInstance.post('/auth/login', {
      email,
      password
    });
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
