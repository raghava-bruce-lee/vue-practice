import axiosInstance from './shared/axiosInstance';

export const fetchLoginStatusWithApi = async (): Promise<boolean> => {
  try {
    const { status } = await axiosInstance.get('/auth/login-status');
    return status === 200;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return false;
  }
};

export const loginWithApi = async (email: string, password: string): Promise<number> => {
  const { status } = await axiosInstance.post('/auth/login', {
    email,
    password
  });
  return status;
};

export const logoutWithApi = async (): Promise<void> => {
  try {
    await axiosInstance.post('auth/logout');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // Empty
  }
};
