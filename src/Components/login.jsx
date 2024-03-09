import { useRef, useState, useEffect} from 'react';
import useAuth from '../hooks/useAuth';
import AuthContext from "../context/AuthProvider";
import {Link, useNavigate, useLocation} from "react-router-dom"
import '../loginstyle.css'
import axios from '../api/axios';

const LOGIN_URL = '/UserAPI/Login';

const Login = () => {
    const { setAuth, persist, setPersist } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    

    useEffect(()=>{
        userRef.current.focus();
    }, [])
    useEffect(()=>{
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) =>{
        e.preventDefault();
        
        try {
            const response = await axios.post("/UserAPI/Login",
                JSON.stringify({email: user, password: pwd}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.jwtToken;
            const roles = [];
            roles.push(response?.data?.role)
            
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            navigate(from, {replace: true});
        }catch(err){
            if(!err?.response){
                setErrMsg('No server response')
            }
            else if(err.response?.status===400){
                setErrMsg("Missing Email or Password")
            }
            else if(err.response?.status===401){
                setErrMsg("Unauthorize")
            }else{
                setErrMsg("Login Failed")
            }
            errRef.current.focus();
        }
        
    }
    const togglePersist = () => {
        setPersist(prev => !prev);
    }
    useEffect(() => {
        localStorage.setItem("persist", true)
    }, [persist])

    return(
             
        <main className="Login">
        <section id="loginbody">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live='assertive'>{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="user">
                    Email: 
                </label>
                <input 
                    type="text" 
                    id="user"
                    ref={userRef}
                    autoComplete='off'
                    onChange={(e)=>setUser(e.target.value)}
                    valie={user}
                    required

                 />
                 <label htmlFor="password">
                    Password: 
                </label>
                <input 
                    type="password" 
                    id="password"
                    ref={userRef}
                    autoComplete='off'
                    onChange={(e)=>setPwd(e.target.value)}
                    valie={pwd}
                    required
                    
                 />
                 <br />
                 <button onChange={togglePersist}>Sign In</button>
                 
            </form>
            <p>
                Need an Account? <br/>
                <span className='line'>
                <Link to="/register">Sign Up</Link>
                </span>
            </p>
        </section>
        </main>
        
    )}
    

export default Login;