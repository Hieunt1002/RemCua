// ProductItem.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './Button';
import axios from 'axios';
import { API_KEY } from '../utils/createAxios';

function ProductItem(props) {
    const user = localStorage.getItem('user');
    const navigate = useNavigate();

    const handleSubmit = async (event, productId) => {
        event.preventDefault();
        if (user === null) {
            navigate('/sign-up');
        } else {
            const userData = {
                productId: productId,
                userId: user,
                quantity: 1
            };
            try {
                await axios.post(`${API_KEY}/cart`, userData);
                alert("Bạn đã đặt hàng thành công.");
            } catch (error) {
                console.error(error);
            }
        }
    };
    return (
        <div className="product-item">
            <Link to={`/productdetal/${props.productId}`} style={{ textDecoration: 'none', color: 'black' }}> {/* Sửa đường dẫn để chuyển hướng đến trang ProductDetail với ID của sản phẩm */}
                <img src={props.pImg} alt="rem cua" style={{height : '300px'}} />
                <div className="product-text">
                    <h5>{props.price}.VNĐ</h5>
                    <div>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                    </div>
                    <h4 style={{height : '30px'}}>{props.productName}</h4>
                </div>
            </Link>
            <div className="product-button-wrapper">
                <div style={{ backgroundColor: 'green', width: '200px', marginLeft: 'auto', marginRight: 'auto' }}>
                    <Button buttonStyle='btn--outline' onClick={event => handleSubmit(event, props.productId)}>
                        <Link style={{ textDecoration: 'none' }}>ADD TO CART</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ProductItem;
