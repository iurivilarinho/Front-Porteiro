import axios from "axios";

const httpRequest = axios.create({
  baseURL: "http://localhost:8081",
  withCredentials: true,
});

export default httpRequest;
