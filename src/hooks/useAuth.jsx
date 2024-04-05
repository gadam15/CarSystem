import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
//Komponent używania autentykacji
const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;