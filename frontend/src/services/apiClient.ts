import axios from 'axios';

const createApiClient = (baseUrl: string) => {
  const token = localStorage.getItem('apiToken') ?? import.meta.env.VITE_API_TOKEN;

  const client = axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.data?.message) {
        return Promise.reject(new Error(error.response.data.message));
      }
      return Promise.reject(error);
    },
  );

  return client;
};

export default createApiClient;
