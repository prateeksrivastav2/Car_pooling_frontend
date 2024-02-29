import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Login.css";

function SignUp() {
  const [username, setUsername] = useState(''); // Add username state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        // Registration successful
        const data = await response.json();
        console.log('Registration successful:', data);

        // You can redirect to the login page or any other page as needed
        navigate('/login');
      } else {
        // Registration failed, handle the error
        const errorData = await response.json();
        console.error('Registration failed:', errorData);

        // Show a prompt for registration failure
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);

      // Show a prompt for registration failure
      alert('An error occurred during registration. Please try again.');
    }
  };

  return (
    <div className="main">
      <MDBContainer fluid>
        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12'>
            <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
              <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
                <p className="text-white-50 mb-5">Please register your username, email, and password!</p>
                <MDBInput
                  wrapperClass='mb-4 mx-5 w-100'
                  labelClass='text-white'
                  label='Username'
                  id='formControlLg'
                  type='text'
                  size="lg"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <MDBInput
                  wrapperClass='mb-4 mx-5 w-100'
                  labelClass='text-white'
                  label='Email address'
                  id='formControlLg'
                  type='email'
                  size="lg"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <MDBInput
                  wrapperClass='mb-4 mx-5 w-100'
                  labelClass='text-white'
                  label='Password'
                  id='formControlLg'
                  type='password'
                  size="lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <MDBBtn onClick={handleSignUp} outline className='mx-2 px-5' color='white' size='lg'>
                  Sign Up
                </MDBBtn>
                <div className='d-flex flex-row mt-3 mb-5'>
                  <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                    <MDBIcon fab icon='facebook-f' size="lg"/>
                  </MDBBtn>
                  <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                    <MDBIcon fab icon='twitter' size="lg"/>
                  </MDBBtn>
                  <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
                    <MDBIcon fab icon='google' size="lg"/>
                  </MDBBtn>
                </div>
                <div>
                  <p className="mb-0">Already have an account? <Link to="/login" className="text-white-50 fw-bold">Login</Link></p>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default SignUp;
