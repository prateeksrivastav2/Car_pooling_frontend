import React from 'react'
import SignUp from './Signup'

const NewSignup = () => {
  return (
    <div>
      this is the new signup
      <div style={{display:'flex',flexDirection:'row'}}>
        <div className='signup' style={{width:'50vw'}}>
            <SignUp/>
        </div>
        <div style={{width:'50vw',height:'100vh'}}>
            <img src="https://media.istockphoto.com/id/1271645211/vector/car-sharing-service-concept-vector-illustration-on-white-background-men-and-women-with-car.jpg?s=612x612&w=0&k=20&c=7OILfq7fEyzvbxzRmdgg8zZq2eh_dgQIRm3hyZtOOMg=" alt=""
            style={{height:'100vh'}}
            />
        </div>
      </div>
    </div>
  )
}

export default NewSignup
