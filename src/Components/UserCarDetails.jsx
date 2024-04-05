import { useState, useEffect } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link, redirect, useSearchParams} from "react-router-dom"
import dateFormat from 'dateformat'

//Komponent podstrony wyświetlającej informacje o konkretnym samochodzie zalogowanego użytkownika
const UserCarDetails = () => {
    const [ car, setCar] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(()=>{
        let isMounted = true;
        const controller = new AbortController();
        //Pobranie parametru ID z URL
        const queryParams = new URLSearchParams(location.search);
        const id = queryParams.get('id');
        const getCars = async () =>{
            try{
                //Zapytanie do API
                const response = await axiosPrivate.get(`/CarAPI/GetCarById/${id}`, {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setCar(response.data);
                
            }catch(err){
                //Błędy i przekierowanie do stron 404 lub logowania
                console.error(err);
                if(err.response?.status===404){
                    navigate('/*', { state: {from: location}, replace: true})
                }
                else if(err.response?.status===404)
                navigate('/login', { state: {from: location}, replace: true});
            }
        }
        getCars();

        return() => {
            isMounted = false;
            
            controller.abort()
        }
    },[])
    console.log(car)
    const changeD = dateFormat(car?.updateDate, "dd.mm.yyyy")
    //Zwrot widoku strony
    return (
        
        <div className="container h-75 text-center bg-dark mt-1 rounded-2 pb-2">
                <h1 className="pt-3 pb-3">{car?.marka} {car?.model}</h1>
                <div className="row">
                    <div className="col">
                        <h5>Year
                        <br />
                        {car?.rok}
                        </h5>
                    </div>
                    <div className="col">
                        <h5>Counter
                        <br />
                        {car?.licznik}
                        </h5>
                        <p className="fst-italic">Last change: {changeD}</p>
                    </div>
                </div>
                <br />
                <h4>More about car</h4>
                <div className="containter text-center">
                    {car?.opis}
                </div>
                <br />
                
                <Link to={`/updateCounter?id=${car?.id}`} className="text-decoration-none"><span className="text-decoration-none">Click here to change counter value</span></Link>

        </div>
        
    );
}

export default UserCarDetails