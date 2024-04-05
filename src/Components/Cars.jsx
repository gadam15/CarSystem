import { useState, useEffect } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link, redirect} from "react-router-dom"

const Cars = () => {
    const [ cars, setCars] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(()=>{
        let isMounted = true;
        const controller = new AbortController();
        
        
        
        const getCars = async () =>{
            try{
                const response = await axiosPrivate.get('/CarAPI/GetAllCars', {
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
            <h2 className="text-center pt-3 pb-3">All Cars</h2>
            
            
            {cars?.length
                ? ( 
                    <>
                        <div className="container h-75 text-center">
                        {cars.map((car, i) => 

                                <>

                                <div className="pt-2 pb-2 d-flex justify-content-center bg-dark rounded-1" key={i}>
                                    <div className="container fs-3">{car?.marka}</div> 
                                    <div className="container fs-3"> {car?.model} </div>
                                    <div className="container fs-3 "> 
                                        <Link to={`/carDetails?id=${car?.id}`}><span className="btn btn-secondary m-1">Show more</span></Link>
                                        
                                    </div>
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

export default Cars