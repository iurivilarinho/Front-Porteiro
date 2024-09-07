import axios from "axios";

const httpRequest = axios.create({
  baseURL: "http://198.27.114.51:8088",
  withCredentials: true,
});

export default httpRequest;
