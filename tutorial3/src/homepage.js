/*
  Author: Ayush Amrishbhai Patel
  BannerID: B00855591
  Tutorial 3: CSCI 4177 Advanced Web Services
*/

import React from 'react';

const Homepage = ({firstName,lastName,emailAddress}) => {

    const goBack = () => {
       window.history.go("/App");
    };

    return (
        <div className="container mt-5">
            <h1>Welcome to Homepage</h1>
            <p>First Name: {firstName}</p>
            <p>Last Name: {lastName}</p>
            <p>Email Address: {emailAddress}</p>

            <button className='btn btn-primary fw-bold' onClick={goBack}>Go Back</button>
        </div>
    );
};

export default Homepage;