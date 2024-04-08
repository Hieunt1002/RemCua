import React from 'react'
import '../../App.css';
import ProductDetail from '../ProductDetail';
import Footer from '../Footer';
import Navbar from '../Navbar';


function ProductDetails() {
  return (
    <>
      <Navbar/>
      <ProductDetail />
      <Footer />
    </>
  );
}
export default ProductDetails;
