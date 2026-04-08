import axios from "axios";

// Configuração request backend
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
});

let activeRequests = 0;

function showLoader() {
  document.body.classList.add("loading");
}

function hideLoader() {
  document.body.classList.remove("loading");
}

// Quando COMEÇAR a requisição
api.interceptors.request.use((config) => {
  activeRequests += 1;
  showLoader();

  // Rotas que não precisam de token
  if (config.public) {
    return config;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    activeRequests = Math.max(0, activeRequests - 1);
    if (activeRequests === 0) hideLoader();
    return Promise.reject(new Error("Token não encontrado."));
  }

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Quando TERMINAR a requisição
api.interceptors.response.use(
  (response) => {
    activeRequests = Math.max(0, activeRequests - 1);

    if (activeRequests === 0) {
      hideLoader();
    }

    return response;
  },
  (error) => {
    activeRequests = Math.max(0, activeRequests - 1);

    if (activeRequests === 0) {
      hideLoader();
    }

    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
    }

    return Promise.reject(error);
  },
);

export default api;
