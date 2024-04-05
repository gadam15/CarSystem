import axios from "../api/axios";
import useAuth from "./useAuth";

//Komponent wylogowania użytkownika
const useLogout = () => {
    const {setAuth} = useAuth();
    const logout = async () =>{
        setAuth();
        try{
            //Zapytanie do API
            const response = await axios.get('/UserAPI/Logout', {
                withCredentials: true
            });
        
        }
        catch (err){
            console.error(err);
        }
    }
    return logout;
}

export default useLogout;