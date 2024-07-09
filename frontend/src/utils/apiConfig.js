import axios from 'axios';

// Créer une instance Axios avec une configuration de base
const api = axios.create({
    baseURL: "http://localhost:8000", // URL de base de votre API backend
    headers: {
        'Content-Type': 'application/json',
    }
});

// Ajouter un interceptor pour inclure le jeton JWT dans les en-têtes de chaque requête
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Récupérer le jeton depuis le stockage local

        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Inclure le jeton dans le header Authorization
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;