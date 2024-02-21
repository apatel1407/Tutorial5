import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
  
    //This method is triggered when the form is submitted by the user.
    const handleSubmit = async () => {
      try {
        //response variable to post the username and password using the API. 
        const response = await fetch('https://express-t4.onrender.com/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: emailAddress,
            password: password,
          }),
        });
  
        //If the username and password are correct then a message is displayed in the console and user is forwarded to profile listing page.
        //else error message is displayed.
        if (response.ok) {
          console.log('Login successful');
          navigate('/profileListing');
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.message);
        }
      } catch (error) {
        console.error('Error occurred:', error);
      }
    };
  
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div>
            <label style={{margin: '5px'}}>Email:</label>
            <input type="email" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} required />
          </div>
          <div>
            <label style={{margin: '5px'}}>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
          <button type="submit">Login</button>
        </form>
      </div>
    );
}

export default LoginPage;