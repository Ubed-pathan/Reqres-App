import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_SERVER_API}`;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = async (email: string, password: string) => {
  try{
    const response = await api.post("/login", { email, password });
    return response;
  }
  catch(error){
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};

export const fetchUsers = async (page: number) => {
  try {
    const response = await api.get(`/users?page=${page}`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};

export const updateUser = async (userId: string, updatedData: any) => {
  try {
    const response = await api.put(`/users/${userId}`, updatedData);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const response = await api.delete(`/users/${userId}`);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    }
    throw error;
  }
};
