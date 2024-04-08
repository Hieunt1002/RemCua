import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Pages/Home';
import Services from './components/Pages/Services';
import Products from './components/Pages/Products';
import SignUp from './components/Pages/SignUp';
import Footer from './components/Footer';
import ProductDetail from './components/Pages/ProductDetails';
import CartCustomer from './components/Pages/CartCustomer';
import ProfileUser from './components/Pages/ProfileUser';
import ProductAdmin from './components/Pages/ProductAdmin';
import CartAdmin from './components/Pages/CartAdmin';
import CustomerPage from './components/Pages/CustomerPage';
import Register from './components/Pages/register';
import ResetPassPage from './components/Pages/ResetPassPage';
import axios from 'axios';
import { API_KEY } from './utils/createAxios';

function App() {
  const user = localStorage.getItem('user');
  const [data, setData] = useState(null); // Changed from empty string to null
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
    <Router>
      <Routes>
        {user ? (
          <>
            {data && (
              <>
                 {data.roleId !== 1 ? (
                  <>
                    <Route path='/' element={<Home />} />
                    <Route path='/productdetal/:id' element={<ProductDetail />} />
                    <Route path='/services' element={<Services />} />
                    <Route path='/resetpass' element={<ResetPassPage />} />
                    <Route path='/products' element={<Products />} />
                    <Route path='/cart' element={<CartCustomer />} />
                    <Route path='*' element={<Navigate to="/" />} />
                  </>
                ) : (
                  <>
                    <Route path='/cartadmin' element={<CartAdmin />} />
                    <Route path='/profile' element={<ProfileUser />} />
                    <Route path='/productAdmin' element={<ProductAdmin />} />
                    <Route path='/customer' element={<CustomerPage />} />
                    <Route path='*' element={<Navigate to="/productAdmin" />} />
                  </>
                )}
                <Route path='*' element={<Navigate to="/" />} />
              </>
            )}
          </>
        ) : (
          <>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='*' element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
