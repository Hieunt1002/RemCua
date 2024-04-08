import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Profile from '../Profile';
import HeaderAdmin from '../HeaderAdmin'; // Import HeaderAdmin component
import axios from 'axios';
import { API_KEY } from '../../utils/createAxios';

function ProfileUser() {
  const user = localStorage.getItem('user');
  const [data, setData] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${API_KEY}/user/UserInfor?id=${user}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  return (
    <>
      {data && (
        <>
          {data.roleId !== 1 ? (
            <>
              <Navbar />
            </>
          ) : (
            <>
              <HeaderAdmin />
            </>
          )}
          <Profile />
          <Footer />
        </>
      )}
    </>
  );
}

export default ProfileUser;
