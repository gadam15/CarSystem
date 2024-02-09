import Cookies from "js-cookie";
import axios from "../api/axios"
import useAuth from './useAuth'
const useRefreshToken = () => {
    const {setAuth} = useAuth();
    const refresh = async () => {
        const response = await axios.get('/UserAPI/GetRefreshToken', {
            withCredentials: true
        });
        setAuth(prev => {
            const roles = [];
            roles.push(response.data.roles)
            console.log(response.data);
            return {
                 ...prev,
                 roles: roles,
                 accessToken: response.data.jwtToken}
        });
        console.log(response.data)
        return response.data.jwtToken;
    }
    return refresh
}

export default useRefreshToken;