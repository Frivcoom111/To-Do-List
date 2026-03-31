import axios from "axios";

// Configuração request backend
const api = await axios.create({
  baseURL: "http://localhost:3000",
});

// Quando COMEÇAR a requisição
api.interceptors.request.use((config) => {
  // Mostra o loading
  document.body.classList.add("loading");
  return config;
});

// Quando TERMINAR a requisição
api.interceptors.response.use(
  (response) => {
    // Esconde o loading
    document.body.classList.remove("loading");
    return response;
  },
  (error) => {
    // Esconde o loading mesmo se der erro
    document.body.classList.remove("loading");
    return Promise.reject(error);
  },
);

export default api;
