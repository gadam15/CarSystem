import { useState, useEffect } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link, redirect, useSearchParams} from "react-router-dom"
import dateFormat from 'dateformat'

//Komponent podstrony wyświetlającej użytkownika
const Profile = () => {
    //Deklaracja zmiennych
    const [ user, setUser] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(()=>{
        let isMounted = true;
        const controller = new AbortController();
        //Pobranie parametru ID z URL
        const queryParams = new URLSearchParams(location.search);
        const id = queryParams.get('id');
        
        const getUser = async () =>{
            try{
                //Zapytanie do API
                const response = await axiosPrivate.get(`/UserAPI/GetUser/${id}`, {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUser(response.data);
                
            }catch(err){
                //przekierowanie do strony logowania lub 404 w razie błędów
                console.error(err);
                if(err.response?.status===404){
                    navigate('/*', { state: {from: location}, replace: true})
                }
                else if(err.response?.status===404)
                navigate('/login', { state: {from: location}, replace: true});
            }
        }
        getUser();

        return() => {
            isMounted = false;
            
            controller.abort()
        }
        
    },[])
    const create = dateFormat(user?.createDate, "dd.mm.yyyy")
    console.log(user)
    
    //Zwrot widoku podstrony
    return (
        <div className="container h-75 bg-dark mt-1 rounded-2 pb-2">
                <h1 className="pt-3 pb-3">{user?.userName}</h1>
                    <div>
                        <h6>e-mail:  {user?.email}
                        </h6>
                    </div>
                    <div>
                        <h6>Role:  {user?.role}
                        </h6>
                    </div>
                    <div>
                        <h6>Joined: {create}
                        </h6>
                    </div>
                
                <br />
                
                <br />
                        
        </div>
        
        
    );
}

export default Profile