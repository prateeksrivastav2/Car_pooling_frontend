import React,{useEffect} from 'react'
import { useNavigate } from "react-router-dom";

const Myrides = () => {

  const getdetails=async()=>{
    try {
      const response = await axios.get('http://localhost:3000/rides/list');
      setRides(response.data);
    } catch (error) {
      console.error('Error fetching rides:', error);
      // Handle error, show an alert, etc.
    }
  }
  const navigate=useNavigate();
    useEffect(() => {
      if(!localStorage.getItem('token'))
      navigate('/login');
    getdetails();
    }, [])
    
  return (
    <div>

    </div>
  )
}

export default Myrides