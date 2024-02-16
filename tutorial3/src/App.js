/*
  Author: Ayush Amrishbhai Patel
  BannerID: B00855591
  Tutorial 3: CSCI 4177 Advanced Web Services

  References:
    1. Line of Code Snippets: 48
        URL: https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s01.html
        Date Accessed: 15 February 2024
        Reason for usage: Used this website to understand how to form a regex for email validation.

    2. Line of Code Snippets: 55
        URL: https://www.ocpsoft.org/tutorials/regular-expressions/password-regular-expression/
        Date Accessed: 15 February 2024
        Reason for usage: Used this website to understand how to form a regex for password validation.
*/

import './App.css';
import React, { useState } from 'react';
import Homepage from './homepage';

function App() {
  const [fName, setFirstName] = useState('');
  const [lName, setLastName] = useState('');
  const [eAddress, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [fNameError, setfNameError] = useState('');
  const [lNameError, setlNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const [isValid, setisValid] = useState(false);

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(e.target.value && !emailRegex.test(e.target.value) ? 'Invalid email address' : '');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{"':;?/>.<,])(?=.{8,})/;
    setPasswordError(e.target.value && !passwordRegex.test(e.target.value) ? 'Password must be 8 characters long and it must contain at least one uppercase letter, one lowercase letter, one number, and one special character' : '');
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit= (e) => {
    e.preventDefault();

    setisValid(true);

    if (!fName) {
      setfNameError('Please enter first Name.');
      setisValid(false);
    }else {
      setfNameError('');
    }
  
    if (!lName) {
      setlNameError('Please enter last Name.');
      setisValid(false);
    }
  
    if (!eAddress) {
      setEmailError('Please enter Email Address.');
      setisValid(false);
    }
  
    if (!password) {
      setPasswordError('Please enter Password.');
      setisValid(false);
    }

    
  };
return(
  <>{ 
    isValid?(
      <>
      <Homepage firstName={fName} lastName={lName} emailAddress={eAddress} ></Homepage>
      </>
):(<>
    <div className="App">
      <main className="container mt-5">
        <form onSubmit={handleSubmit}>
          <h2 className='text-center p-2'>Register Form</h2>
          <div className="mb-3 row">
            <label htmlFor="fName" className="col-sm-3 col-form-label fw-bold">First Name:</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" id="fName" name="fName" value={fName} onChange={handleFirstNameChange} required />
              {fNameError && <div className="text-danger">{fNameError}</div>}
            </div>
          </div>
          
          <div className="mb-3 row">
            <label htmlFor="lName" className="col-sm-3 col-form-label fw-bold">Last Name:</label>
            <div className="col-sm-9">
              <input type="text" className="form-control" id="lName" name="lName" value={lName} onChange={handleLastNameChange} required />
              {lNameError && <div className="text-danger">{lNameError}</div>}
            </div>
          </div>
          
          <div className="mb-3 row">
            <label htmlFor="eAddress" className="col-sm-3 col-form-label fw-bold">Email Address:</label>
            <div className="col-sm-9">
              <input type="email" className="form-control" id="eAddress" name="eAddress" value={eAddress} onChange={handleEmailChange} required />
              {emailError && <div className="text-danger">{emailError}</div>}
            </div>
          </div>
          
          <div className="mb-3 row">
            <label htmlFor="password" className="col-sm-3 col-form-label fw-bold">New Password:</label>
            <div className="col-sm-9">
              <input type="password" className="form-control" id="password" name="password" value={password} onChange={handlePasswordChange} required />
              {passwordError && <div className="text-danger">{passwordError}</div>}
            </div>
          </div>
          
          <div className="mb-3 row">
            <label htmlFor="cPassword" className="col-sm-3 col-form-label fw-bold">Confirm Password:</label>
            <div className="col-sm-9">
              <input type="password" className="form-control" id="cPassword" name="cPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
              {confirmPassword !== password && <div className="text-danger">Passwords do not match</div>}
            </div>
          </div>
          
          <div className="mb-3 row">
            <div className="text-center">
              <button type="Submit" className="btn btn-primary fw-bold">Register</button>
            </div>
          </div>
        </form>
      </main>
    </div>
  </>)}
  </>)
  
}

export default App;
