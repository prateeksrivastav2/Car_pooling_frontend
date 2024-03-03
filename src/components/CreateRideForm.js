import React, { useState,useEffect } from 'react';
import axios from 'axios';

const CreateRide = () => {
  const [step, setStep] = useState(1);
  const [checkauth,setcheckauth]=useState(false);
  // RIDE DETAIL
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    dob: '',
    email: '',
    address: '',
    message: '',
    startingLocation: '',
    destination: '',
    date: '',
    availableSeats: ''
  });
  const [rideCreated, setRideCreated] = useState(false); // Flag to indicate if the ride has been created
useEffect(() => {
if(localStorage.getItem('token'))
  setcheckauth(true)
  else
  window.location.replace('/login');
}, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // const token = localStorage.getItem('token');
      if (step === 3 && !rideCreated) { // Check if the current step is the third step and ride has not been created
        const response = await axios.post('http://localhost:3000/rides/create', {
          startingLocation: formData.startingLocation,
          destination: formData.destination,
          date: formData.date,
          availableSeats: formData.availableSeats,
          userEmail: formData.email
        });
        if (response.data) {
          console.log('Ride created successfully:', response.data);
          setRideCreated(true); // Set rideCreated flag to true after successful creation
          // You can redirect or update state accordingly
        }
      }
    } catch (error) {
      console.error('Error creating ride:', error);
      // Handle error, show an alert, etc.
    }
  };

  return (
  <>
    <div className="container mt-5">
      <div className="row justify-content-center " style={{ marginTop: '14vh' }}>
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-4">
                <div className={`d-flex align-items-center ${step === 1 ? 'text-primary' : 'text-muted'}`}>
                  <div className="rounded-circle bg-primary text-white p-2 me-2">1</div>
                  <div>License Verification</div>
                </div>
                <div className={`d-flex align-items-center ${step === 2 ? 'text-primary' : 'text-muted'}`}>
                  <div className="rounded-circle bg-primary text-white p-2 me-2">2</div>
                  <div>Ride Details</div>
                </div>
                <div className={`d-flex align-items-center ${step === 3 ? 'text-primary' : 'text-muted'}`}>
                  <div className="rounded-circle bg-primary text-white p-2 me-2">3</div>
                  <div>Confirm Journey</div>
                </div>
              </div>
              <form onSubmit={handleSubmit} >
                {step === 1 && (
                  <div className="mb-3">
                    <label htmlFor="firstname" className="form-label">First Name</label>
                    <input type="text" name="firstname" id="firstname" className="form-control" value={formData.firstname} onChange={handleChange} />
                  </div>
                )}
                {step === 2 && (
                  <>
                    <div className="row mb-3">
                      <div className="col">
                        <label htmlFor="firstname" className="form-label">Name</label>
                        <input type="text" name="firstname" id="firstname" className="form-control" value={formData.firstname} onChange={handleChange} />
                      </div>
                      <div className="col">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" name="email" id="email" className="form-control" value={formData.email} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className='col'>
                        <label htmlFor="source" className="form-label">Source</label>
                        <input type="text" name="startingLocation" id="source" className="form-control" value={formData.startingLocation} onChange={handleChange} />
                      </div>
                      <div className="col">
                        <label htmlFor="destination" className="form-label">Destination</label>
                        <input type="text" name="destination" id="destination" className="form-control" value={formData.destination} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input type="date" name="date" id="date" className="form-control" value={formData.date} onChange={handleChange} />
                      </div>
                      <div className="col">
                        <label htmlFor="availableSeats" className="form-label">Available Seats</label>
                        <input type="number" name="availableSeats" id="availableSeats" className="form-control" value={formData.availableSeats} onChange={handleChange} />
                      </div>
                    </div>
                  </>
                )}
                {step === 3 && (
                  <div>
                    <p className="text-muted mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                    <div className="mb-3">
                      <button type="button" onClick={nextStep} className="btn btn-primary me-2">Yes! I want it.</button>
                      <button type="button" onClick={prevStep} className="btn btn-secondary">No! I don’t want it.</button>
                    </div>
                  </div>
                )}
                <div className="d-flex justify-content-between mt-4">
                  {step > 1 && (
                    <button type="button" onClick={prevStep} className="btn btn-secondary">Back</button>
                  )}
                  {step < 3 ? (
                    <button type="button" onClick={nextStep} className="btn btn-primary">Next Step</button>
                  ) : (
                    <button type="submit"  className="btn btn-primary">Submit</button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default CreateRide;
