//Strona będąca routerem całej aplikacji. Tutaj nadaje się komponentom ścierzkę oraz definiuje ich zabezpieczenia

import Register from './Components/register';
import Login from './Components/login';
import FuelUsage from './Components/fuelUsage';
import Home  from './Components/homePage';
import Admin from './Components/Admin'
import Main from './Components/MainPage'
import Layout from './Components/Layout';
import {Routes, Route} from 'react-router-dom'
import Unauthorized from './Components/Unauthorized';
import Missing from './Components/Missing';
import RequireAuth from './Components/RequireAuth';
import Profile from './Components/profile';
import PersistLogin from './Components/PersistLogin';
import Navigbar from './Components/Elements/navbar';
import MyCars from './Components/MyCars';
import CarDetails from './Components/CarDetails';
import DeleteCar from './Components/DeleteCar';
import Cars from './Components/Cars';
import AddCar from './Components/AddCar';
import UpdateCar from './Components/UpdateCar';
import CounterChange from './Components/CouterChange';
import Footer from './Components/Elements/footer';
import UserCarDetails from './Components/UserCarDetails';
const ROLES = {
  'User': 'User',
  'Admin': 'Admin'
}
function App() {

  //Zwrot wszystkich elementów routera (pierwsze są niewymagające zalogowania, kolejne wymagają już od użytkownika bycia zalogowanym)
  return (
    <Routes>
      <Route path ="/" element={<><Layout/></>}>
        <Route path="main" element={<Main />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route element={<PersistLogin />}>
        
        <Route element={<><Navigbar/><RequireAuth allowedRoles={['Admin', 'User']}/></>}>
          <Route path="/" element={<Cars />}/>
          <Route path="fuelUsage" element={<FuelUsage />}/>
          <Route path="myCars" element={<MyCars />}></Route>
          <Route path="carDetails" element={<CarDetails />}></Route>
          <Route path="userCarDetails" element={<UserCarDetails />}></Route>
          <Route path="deleteCar" element={<DeleteCar />}></Route>
          <Route path="addCar" element={<AddCar />}></Route>
          <Route path="*" element={<Missing />} />
          <Route path="updateCar" element={<UpdateCar />}></Route>
          <Route path="updateCounter" element={<CounterChange />}></Route>
          <Route path="profile" element={<Profile />} ></Route>
          </Route>
          <Route element={<RequireAuth allowedRoles={['Admin']}/>}>
          <Route path="admin" element={<Admin />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={['User']}/>}>
          
          </Route>
        </Route> 
        
      </Route>
    </Routes>
  );
}

export default App;