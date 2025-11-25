import Axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL;

export const axiosInstance = Axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const socketAxios = Axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const API = {
  login: (data: any) =>
    axiosInstance.post("/auth/login", data).then((res) => res.data),

  getUsers: () => axiosInstance.get("/users").then((res) => res.data),

  createUser: (data: any) =>
    axiosInstance.post("/users", data).then((res) => res.data),

  updateUser: (id: number, data: any) =>
    axiosInstance.put(`/users/${id}`, data).then((res) => res.data),

  deleteUser: (id: number) =>
    axiosInstance.delete(`/users/${id}`).then((res) => res.data),
};
