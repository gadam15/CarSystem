import axios from 'axios';
import Cookies from 'js-cookie';
//Komponent konfigurujący połaczenie z API
const api = axios.create({
  //URL API
  baseURL: '/api',
});

// Add a request interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      //Błąd oznacza wygaśnięcie tokenu JWT, a tym samym odświerzenie go
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          //Zapytanie do API
          const refreshToken = Cookies.get("refresh")
          const response = await axios.post('/api/refresh-token', { refreshToken });
          const { token } = response.data;
  
          localStorage.setItem('token', token);
  
          // Ustawienie niezbędnego do autoryzowanych metod nagłówka
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axios(originalRequest);
        } catch (error) {
          
        }
      }
  
      return Promise.reject(error);
    }
  );

export default api