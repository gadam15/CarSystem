import { useState, useEffect } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link, redirect} from "react-router-dom"

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
            <h2>My Cars</h2>
            
            
            {cars?.length
                ? ( 
                    <>
                        <Link to={`/addCar`}><span className="bi bi-plus-circle fs-2"></span></Link>
                        <br />
                        <div className="container h-75">

                            {cars.map((car, i) => 
                                
                            <>
                            
                            <div className="pt-2 pb-2 d-flex justify-content-center bg-dark rounded-1" key={i}>
                                <div className="container fs-3">{car?.marka}</div> 
                                <div className="container fs-3"> {car?.model} </div>
                                <div className="container fs-3 "> 
                                    <Link to={`/userCarDetails?id=${car?.id}`}><span className="btn btn-secondary">Show more</span></Link>
                                    <Link to={`/updateCar?id=${car?.id}`}><span className="btn btn-success m-1">Update</span></Link>
                                    <Link to={`/deleteCar?id=${car?.id}`}><span className="btn btn-danger">Delete</span></Link>
                                         
                                </div>
                            </div>  
                             <br />
                             
                            </>
                         )}
                        </div>
                        
                        </>   
                        
                
                ) : <>
                <h4>No cars to display</h4>
                <br />
                <h5>Click the button below and add your car!</h5>
                <Link to={`/addCar`}><span className="bi bi-plus-circle fs-2"></span></Link>
                </>
            }
            
            <br />
        </article>
        
    );
}

export default UserCars