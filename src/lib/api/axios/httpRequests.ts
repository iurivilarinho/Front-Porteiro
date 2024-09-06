import axios from "axios";

const httpRequest = axios.create({
  baseURL: "https://104.21.76.236:8088",
  withCredentials: true,
});

export default httpRequest;
