import React, { useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function ProfileListing() {
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  //In this function, the details of user is fetched from the API using fetch and stored in "users" array.
  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await fetch('https://express-t4.onrender.com/api/users');
        if (response.ok) {
          const userData = await response.json();
          setUsers(userData);
        } else {
          console.error('Failed to fetch users data');
        }
      } catch (error) {
        console.error('Error in fetching:', error);
      }
    };

    fetchUserList(); 
  }, []);

  //FilterUsers function filters the data based on the search input provided by user in search bar.
  const filteredUsers = users.filter(user => {
    const name = `${user.name}`.toLowerCase();
    return name.includes(searchValue.toLowerCase());
  });

  return (
    <div>
      <h2>User Listing</h2>
      <div>
        <label style={{padding: '4px'}}>Search for User:</label>
        <input type="text" placeholder="Search by firstname or lastname!!"  style={{width: '15em'}} value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
      </div>
      <ul className="user-grid">
        {/**
         * Description: Displaying username and image of user in form of grid. 
         * <Link> is used to open up the details of the user when user clicks on username or image.
         */}
        {filteredUsers.map(user => (
            <Link to={`/profileDetail/${user._id}`}>
                <li key={user._id} className="user-item">
                    <img src={user.picture} alt={user.name} style={{ width: '32px', height: '32px', marginRight: '10px', padding: '5px' }} />
                    {user.name} 
                </li>
            </Link>
        ))}
      </ul>
    </div>
  );
}

export default ProfileListing;
