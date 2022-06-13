import axios, { AxiosError } from "axios";
import { Routes } from "router/Routes";
import tokenService from "services/tokenService";

const baseURL = process.env.REACT_APP_BASE_URL;

const instance = axios.create({
    baseURL: baseURL ?? "",
});

export function authorizeClient(token: string) {
    instance.defaults.headers.common["Authorization"] = "Bearer " + token;
}

export function removeAuthorization() {
    instance.defaults.headers.common["Authorization"] = "";
}

instance.interceptors.response.use(
    (config) => config,
    (error) => {
        const e = error as AxiosError;
        console.log("+");

        if (e.response?.status === 401) {
            removeAuthorization();
            tokenService.removeToken();
            window.location.href = Routes.Login;
        } else {
            return Promise.reject(error);
        }
    }
);

export default instance;
