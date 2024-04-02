import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import register from './components/Pages/register';
import ResetPassPage from './components/Pages/ResetPassPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact Component={Home}/>
        <Route path='/services' Component={Services}/>
        <Route path='/resetpass' Component={ResetPassPage}/>
        <Route path='/products' Component={Products}/>
        <Route path='/sign-up' Component={SignUp}/>
        <Route path='/cart' Component={CartCustomer}/>
        <Route path='/cartadmin' Component={CartAdmin}/>
        <Route path='/profile' Component={ProfileUser}/>
        <Route path='/productAdmin' Component={ProductAdmin}/>
        <Route path='/customer' Component={CustomerPage}/>
        <Route path='/register' Component={register}/>
        <Route path='/productdetal/:id' Component={ProductDetail}/>
      </Routes>
    </Router>
  );
}

export default App;
