import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const instance = axios.create({
    baseURL: baseURL ?? "",
});

export function authorizeClient(token: string) {
    instance.defaults.headers.common["Authorization"] = "Bearer " + token;
}

export default instance;
