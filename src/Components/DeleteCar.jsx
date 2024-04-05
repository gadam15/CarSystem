import { useState, useEffect } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link, redirect, useSearchParams} from "react-router-dom"

//Komponent podstrony zatwierdzjącej usunięcie samochodu
const DeleteCar = () => {
    //Deklaracja zmiennej samochodu
    const [ car, setCar] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    //pobranie parametru ID z URL
    const queryParams = new URLSearchParams(location.search);
        const id = queryParams.get('id');
        const deleteCar = async () =>{
            try{
                //Zapytanie do API
                const response = await axiosPrivate.delete(`/CarAPI/DeleteUserCar/${id}`)
                console.log(response.data);
                navigate('/myCars', { state: {from: location}, replace: true})
            }catch(err){
                //Alert wyświetlający się w przypadku nieautoryzowanej próby usunięcia samochodu
                console.error(err);
                alert("You are not allowed to do this! Go back!!!")
                
            }
        }
    useEffect(()=>{
        let isMounted = true;

        return() => {
            isMounted = false;
            
            
        }
    },[])
    console.log(car)
    
    //Zwrócenie widoku strony
    return (
        
        <div className="container h-75 text-center bg-dark mt-1 pb-2 w-75 rounded-2">
                <h1 className="pt-3 pb-3">Are you sure you want to delete this car?</h1>
                <div className="row">
                    <div className="col">
                        <div >
                            <Link to={`/myCars`}><span className="btn btn-secondary m-1">No</span></Link>
                            <span className="btn btn-danger m-1" onClick={deleteCar}>Yes</span>
                        </div>
                    </div>
                </div>
                             
        </div>
        
    );
}

export default DeleteCar