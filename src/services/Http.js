import axios from "axios";
import { BASE_API } from "./../shared/constants/app";
import store from "../redux-setup/store";

const Http = axios.create({
  baseURL: BASE_API,
});

Http.interceptors.request.use(
  async (config) => {
    const accessToken = await store.getState().Auth.logged.currentCustomer
      ?.accessToken;
    if (accessToken) {
      config.headers["token"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export default Http;
