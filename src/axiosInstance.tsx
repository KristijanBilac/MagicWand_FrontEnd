import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const instance = axios.create();

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            const navigate = useNavigate();
            navigate('/login');
        }
        return Promise.reject(error);
    }
);

export default instance;
