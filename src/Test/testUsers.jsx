import { useState, useEffect } from "react";
import axios from "./axios";

const TestUsers = () => {
  const [users, setUsers] = useState();

  useEffect(()=>{
    let isMounted = ture;
    const controller = new AbortController();

    const getUsers = async () => {
      try{
        const response = await axios.get('/users',{
          signal: controller.signal
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err){
        console.error(err);
      }
    }

    getUsers();
    
    return() =>{
      isMounted=false;
      controller.abort();
    }

  },[])
  
  

  return( 
    <div>
      <h2>Users List</h2>
      {users?.length
        ?(
          <ul>
            {users.map((user, i ) => <li key={i}> {user?.username}</li>)}
          </ul>
        ) : <p>No users to display</p>
      }
    </div>
  );
};

export default TestUsers;