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
const ROLES = {
  'User': 'User',
  'Admin': 'Admin'
}
function App() {

  return (
    <Routes>
      <Route path ="/" element={<Layout/>}>
        <Route path="main" element={<Main />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route element={<PersistLogin />}>
        <Route element={<RequireAuth allowedRoles={['Admin', 'User']}/>}>
          
          <Route path="/" element={<Home />}/>
          </Route>
          <Route path="/fuelUsage" element={<FuelUsage />}/>
          <Route element={<RequireAuth allowedRoles={['Admin']}/>}>
          <Route path="admin" element={<Admin />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={['User']}/>}>
          <Route path="user" element={<Profile />} />
          </Route>
        </Route> 
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;