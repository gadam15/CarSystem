import { useState, useEffect } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation} from "react-router-dom"

const UserCars = () => {
    const [ cars, setCars] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(()=>{
        let isMounted = true;
        const controller = new AbortController();
        
        
        
        const getCars = async () =>{
            try{
                const response = await axiosPrivate.get('/CarAPI/GetUserCars', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setCars(response.data);
                
            }catch(err){
                console.error(err);
                navigate('/login', { state: {from: location}, replace: true});
            }
        }
        getCars();

        return() => {
            isMounted = false;
            controller.abort()
        }
    },[])
    console.log(cars)
    return (
        
        <article>
            <h2>Users List</h2>
            
            
            {cars?.length
                ? ( 
                    <>
                        <div className="container h-75">
                            {cars.map((car, i) => 
                            <>
                            <div className="border pt-2 pb-2 d-flex justify-content-center" key={i}>
                                <div className="container fs-4">{car?.marka}</div> 
                                <div className="container fs-4"> {car?.model} </div>
                                <div className="container fs-4" >{car?.rok} </div>
                                <div className="container fs-4"> {car?.licznik}</div>
                                <div className="container fs-4"> {car?.licznik}</div>
                                <div className="container fs-4"> {car?.licznik}</div>
                            </div>  
                             <br />
                            </>
                         )}
                        </div>
                        </>   
                        
                
                ) : <p>No cars to display</p>
            }
            
            <br />
        </article>
        
    );
}

export default UserCars