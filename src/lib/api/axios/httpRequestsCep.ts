import axios from "axios";

const httpRequestCep = axios.create({
  baseURL: "https://viacep.com.br/ws/",
});

export default httpRequestCep;
