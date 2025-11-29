import Axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL;
const MOCK_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJSRUFEIn0seyJhdXRob3JpdHkiOiJST0xFX1VTRVIifSx7ImF1dGhvcml0eSI6IlJPTEVfU1VQRVJBRE1JTiJ9LHsiYXV0aG9yaXR5IjoiUkVBRF9BTkRfV1JJVEUifSx7ImF1dGhvcml0eSI6IlJPTEVfQURNSU4ifSx7ImF1dGhvcml0eSI6IldSSVRFIn1dLCJpZCI6MSwic3ViIjoiKzk5ODkwMTIzNDU2NyIsImlhdCI6MTc2NDMyNTk0NiwiZXhwIjoxNzY0NDY5OTQ2fQ.nKwGy-Gmdi0KWnGBECZ7uV5SCxAPf7PkIcvqSmM39rs";

export const axiosInstance = Axios.create({
  baseURL: "http://176.96.243.40:8090/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${MOCK_TOKEN}`,
  },
});

export const API = {
  login: (data: any) =>
    axiosInstance.post("/auth/login", data).then((res) => res.data),

  getUsers: () =>
    axiosInstance.get("/user/get-all?page=0&size=10"),

  createUser: (data: any) =>
    axiosInstance.post("/user", data).then((res) => res.data),

  updateUser: (data: any) =>
    axiosInstance.put("/user", data).then((res) => res.data),

  deleteUser: (id: number) =>
    axiosInstance.delete(`/user/${id}`).then((res) => res.data),
};
