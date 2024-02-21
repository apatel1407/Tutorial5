import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ProfileDetail() {
  const { _id } = useParams();
  const [user, setUser] = useState(null);

  //In this function, the details of user is fetched from the API using fetch and stored in "user" variable.
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`https://express-t4.onrender.com/api/users/${_id}`);
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error('Failed to fetch details of user');
        }
      } catch (error) {
        console.error('Error in fetching:', error);
      }
    };

    fetchUserDetails();
  }, [_id]);

  return (
    <div>
      <h2>Details of User:</h2>
      {user && ( 
        <>
            <p>Name: {user.name}</p> 
            <p>Email: {user.email}</p> 
            <p>Balance: {user.balance}</p>
            <p>Age: {user.age}</p>
            <p>Gender: {user.gender}</p>
            <p>Eye Color: {user.eyeColor}</p>
            <p>Company: {user.company}</p>
            <p>Phone: {user.phone}</p>
            <p>Address: {user.address}</p>
            <p>About: {user.about}</p>
            <p>Registered: {user.registered}</p>
            <p>Latitude: {user.latitude}</p>
            <p>Longitude: {user.longitude}</p>
            <p>Greeting: {user.greeting}</p>
            <p>Favourite Fruite: {user.favoriteFruit}</p>
            <p>Tags: {user.tags.join(', ')}</p>
            <p>Friends: {user.friends.map(friend => friend.name).join(', ')}</p>
        </>
      )}
    </div>
  );
}

export default ProfileDetail;
