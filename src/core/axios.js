import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://parallelum.com.br",
})

export { axiosInstance }