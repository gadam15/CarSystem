import { Link } from "react-router-dom"
import Users from "./Users"
import Cars from "./Cars"
import Navigbar from "./Elements/navbar"
import UserCars from "./UserCars"

const Admin = () => {
    return (
        <>
        <Navigbar />
        <div className="container text-center">
            
            <br />
            <UserCars />
            <br />
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>

        </div>
        </>
    )
}

export default Admin