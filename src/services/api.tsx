import Axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL;

export const axiosInstance = Axios.create({
  baseURL: BASE_URL + "/api/v1/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const API = {
  login: (data: any) =>
    axiosInstance.post("/auth/sign-in", data).then((res) => res.data),
};
