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

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' exact Component={Home}/>
        <Route path='/services' Component={Services}/>
        <Route path='/products' Component={Products}/>
        <Route path='/sign-up' Component={SignUp}/>
        <Route path='/productdetal' Component={ProductDetail}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
