import React from 'react';
import { Button } from './Button';
import ig from '../images/man-vai-tron-can-nang-dep.jpg'; // Placeholder image, replace with actual product images.
import './ProductDetail.css'; // Import CSS file

function ProductDetail() {
    return (
        <>
            <div className='productdetail-container'>
                <div className='product-img'>
                    <img src={ig} alt="" />
                </div>
                <div className="product-text">
                    <h1>Name Product: </h1>
                    <h3>Description: </h3>
                    <h5>Price: $$</h5>
                    <div className="start">
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                    </div>
                    <div className="size">
                        <h2>Quantity</h2>
                        <input type="number" id="quantity" name="quantity" value="1" min="1" />
                        <input type="text" id="product-id" name="productId" value="${data.productId}" hidden />
                        <h5>Category: </h5>
                        <div className="cart">
                            <Button buttonStyle='btn--outline'>Add To Cart</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetail;
