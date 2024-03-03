import React,{useEffect} from 'react'
import { useState } from 'react';

const Home = () => {
    const [user, setuser] = useState(null);
    const fetchusre=async()=>{

        const response = await fetch("http://localhost:3000/auth/getuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            // body: JSON.stringify({ email: email, password: password }),
        });
        const json=await response.json();
        console.log(json);
        setuser(json);
    }
     
    useEffect(() => {
     fetchusre();
    },[]);
    
    
        
  return (
    <div style={{marginTop:'34vh'}}>
        Welcome {user?user.username:""}
    </div>
  )
}

export default Home