import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import UpdatePassword from '../components/UpdatePassword';

export default function AccountDetails(){
  const { user } = useContext(UserContext);

  const [userDetails, setUserDetails] = useState(null);

  const fetchUserDetails = () => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
      return response.json();
    })
    .then(data => {
      setUserDetails(data.user);
    })
    .catch(error => {
      console.error('Error fetching user details:', error.message);
    });
  };

  useEffect(() => {
    fetchUserDetails();
  }, [user]);

  return (
    (user.id === null) ?
      <Navigate to="/" />
      :
      <>
      <div>
        <h2 className="text-center my-4">Account Details</h2>
        {userDetails ? (
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">User Information</h3>
              <p><strong>First Name:</strong> {userDetails.firstName}</p>
              <p><strong>Last Name:</strong> {userDetails.lastName}</p>
              <p><strong>Email:</strong> {userDetails.email}</p>
              <p><strong>Mobile No:</strong> {userDetails.mobileNo}</p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <UpdatePassword />
      </>
  );
};

