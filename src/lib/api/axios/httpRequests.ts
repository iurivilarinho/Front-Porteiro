import axios from "axios";

const httpRequest = axios.create({
  baseURL: "https://saladetestes.com.br:8088",
  withCredentials: true,
});

export default httpRequest;
