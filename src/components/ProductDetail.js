import React, { useEffect, useState } from 'react';
import { Button } from './Button';
import './ProductDetail.css'; // Import CSS file
import { useNavigate, useParams } from 'react-router-dom';
import { API_KEY } from '../utils/createAxios';
import axios from 'axios';

function ProductDetail() {
    const { id } = useParams();
    const [data, setData] = useState('');
    const [brand, setBrand] = useState('');
    const [quantity, setQuantity] = useState(1);
    const user = localStorage.getItem('user');
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`${API_KEY}/product/productId?id=${id}`)
            .then((response) => {
                setData(response.data);
                setBrand(response.data.brands.brandName);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [id]);
    const handleSubmit = async (event, productId) => {
        event.preventDefault();
        if (user === null) {
            navigate('/sign-up');
        } else {
            const userData = {
                productId: productId,
                userId: user,
                quantity: quantity
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
        <>
            <div className='productdetail-container'>
                <div className='product-img'>
                    <img src={data.pImg} alt="" style={{ height: '400px', marginBottom: '40px' }} />
                </div>
                <div className="product-text">
                    <h1>Name Product: {data.productName}</h1>
                    <h3>Description: {data.productDescription}</h3>
                    <h5>Price: {data.price} VNĐ</h5>
                    <div className="start">
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                        <i className="far fa-star"></i>
                    </div>
                    <div className="size">
                        <h2>Quantity</h2>
                        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1" max={data.quantity} />
                        <h5>Category: {brand}</h5>
                        <div className="cart" style={{ width: '200px', marginLeft: 'auto', marginRight: 'auto' }}>
                            <Button onClick={event => handleSubmit(event, data.productId)} buttonStyle='btn--outline'>Add To Cart</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetail;
