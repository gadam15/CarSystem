import Cookies from "js-cookie";
import axios from "../api/axios"
import useAuth from './useAuth'

//Komponent odświerzający JWT
const useRefreshToken = () => {
    //Deklaracja danych autentykacji
    const {setAuth} = useAuth();
    const refresh = async () => {
        //Zapytanie do API
        const response = await axios.get('/UserAPI/GetRefreshToken', {
            withCredentials: true
        });
        //Ustawienie parametrów autentykacji
        setAuth(prev => {
            const roles = [];
            roles.push(response.data.roles)
            console.log(response.data);
            return {
                 ...prev,
                 roles: roles,
                 id: response.data.id,
                 accessToken: response.data.jwtToken}
        });
        //Zwrot nowego tokenu
        console.log(response.data)
        return response.data.jwtToken;
    }
    return refresh
}

export default useRefreshToken;