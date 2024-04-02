import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_KEY } from '../utils/createAxios';
import { Link } from 'react-router-dom';
import './Cart.css';

function Cart() {
    const [data, setData] = useState([]);
    const user = localStorage.getItem('user');
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedOption, setSelectedOption] = useState(0);

    useEffect(() => {
        fetchCartData(0);
    }, []);
    const fetchCartData = async (stauts) => {
        try {
            const response = await axios.get(`${API_KEY}/cart/cartUser?id=${user}&status=${stauts}`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    };
    useEffect(() => {
        let totalPrice = 0;
        data.forEach(item => {
            item.cartDetail.forEach(cartItem => {
                totalPrice += cartItem.product.price * cartItem.quantity;
            });
        });
        setTotalPrice(totalPrice);
    }, [data]);
    const handleSubmit = async (event, cartid) => {
        event.preventDefault();
        try {
            await axios.delete(`${API_KEY}/cart?id=${cartid}`);
            alert("Bạn đã xóa đơn hàng thành công.");
            fetchCartData();
        } catch (error) {
            console.error(error);
        }
    };
    const handleOptionClick = (option) => {
        setSelectedOption(option);
        fetchCartData(option);
    };
    const handlePayment = async (option, status) => {
        try {
            const userData = {
                cartId: option,
                status: status
            };
            await axios.put(`${API_KEY}/cart`, userData);
            if(status === 1) {
                alert("Bạn đã đặt hàng thành công.");
            }else{
                alert("Bạn đã hủy thành công.");
            }
            fetchCartData(0);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div style={{ paddingTop: '50px', paddingBottom: '50px' }}>
            <div>
                <h1>GIỎ HÀNG</h1>
                <div style={{ paddingLeft: '460px', paddingBottom: '20px', paddingTop: '20px' }}>
                    <Link onClick={() => handleOptionClick(0)} className={selectedOption === 0 ? 'selected-option' : 'selected'} style={{ textDecoration: 'none' }}>Chưa thanh toán</Link>
                    <Link onClick={() => handleOptionClick(1)} className={selectedOption === 1 ? 'selected-option' : 'selected'} style={{ paddingLeft: '100px', textDecoration: 'none' }}>Đã thanh toán</Link>
                    <Link onClick={() => handleOptionClick(3)} className={selectedOption === 3 ? 'selected-option' : 'selected'} style={{ paddingLeft: '100px', textDecoration: 'none' }}>Đang vận chuyển</Link>
                    <Link onClick={() => handleOptionClick(2)} className={selectedOption === 2 ? 'selected-option' : 'selected'} style={{ paddingLeft: '100px', textDecoration: 'none' }}>Đã Hủy</Link>
                    <Link onClick={() => handleOptionClick(4)} className={selectedOption === 4 ? 'selected-option' : 'selected'} style={{ paddingLeft: '100px', textDecoration: 'none' }}>Hoàn Thành</Link>
                </div>
                <hr />
            </div>

            <div>
                <table style={{ paddingLeft: '380px' }}>
                    <thead>
                        <tr>
                            <th style={{ paddingRight: '20px', paddingLeft: '20px' }}>Mã Order</th>
                            <th style={{ paddingRight: '20px', paddingLeft: '20px' }}>Hình ảnh</th>
                            <th style={{ paddingRight: '20px', paddingLeft: '20px' }}>Tên sản phẩm</th>
                            <th style={{ paddingRight: '20px', paddingLeft: '20px' }}>Số lượng</th>
                            <th style={{ paddingRight: '20px', paddingLeft: '20px' }}>Giá</th>
                            <th style={{ paddingRight: '20px', paddingLeft: '20px' }}>Tổng giá</th>
                            <th style={{ paddingRight: '20px', paddingLeft: '20px' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <React.Fragment key={item.cartId}>
                                <tr>
                                    <td style={{ paddingRight: '20px', paddingLeft: '20px' }}>
                                        <h5 className="product-titles">
                                            {item.cartId}
                                        </h5>
                                    </td>
                                </tr>
                                {item.cartDetail.map((index) => (
                                    <tr key={index.product.productId}>
                                        <td colSpan="1"></td>
                                        <td style={{ paddingRight: '20px', paddingLeft: '20px' }}>
                                            <img style={{ height: '100px', borderRadius: '10px' }} src={index.product.pImg} alt="" />
                                        </td>
                                        <td style={{ paddingRight: '20px', paddingLeft: '20px' }}>
                                            <h5 className="product-titles">{index.product.productName}</h5>
                                        </td>
                                        <td style={{ paddingRight: '20px', paddingLeft: '20px' }}>
                                            <h5 className="product-titles">{index.quantity}</h5>
                                        </td>
                                        <td style={{ paddingRight: '20px', paddingLeft: '20px' }}>
                                            <h5 className="product-titles">{index.product.price}VNĐ</h5>
                                        </td>
                                        <td style={{ paddingRight: '20px', paddingLeft: '20px' }}>
                                            <h5 className="product-titles">{index.product.price * index.quantity}VNĐ</h5>
                                        </td>
                                        <td style={{ paddingRight: '20px', paddingLeft: '20px' }}>
                                            {selectedOption === 0 ?
                                                <button className="delete" onClick={(event) => handleSubmit(event, index.cartDetailId)} style={{ backgroundColor: 'red', height: '30px', width: '50px' }}>Delete</button>
                                                : selectedOption === 1 ?
                                                    <p style={{ color: 'yellow' }}>Đã đạt hàng</p>
                                                    : selectedOption === 2 ?
                                                        <p style={{ color: 'red' }}> Đã Hủy </p>
                                                        : selectedOption === 3 ?
                                                            <p style={{ color: 'blue' }}> Đang Vận Chuyển </p>
                                                            :
                                                            <p style={{ color: 'green' }}> Đã Nhận đơn hàng </p>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>


                <div style={{ paddingLeft: '1000px', paddingTop: '40px' }}>
                    <h2>Total Price: <span>{totalPrice}VNĐ</span></h2>
                    {selectedOption === 0 ?
                        <div style={{ paddingTop: '20px', paddingLeft: '30px' }}>
                            {data.map((item) => (
                                <button onClick={() => handlePayment(item.cartId, 1)} key={item.cartId} className="btn btn-success">Thanh toán</button>
                            ))}
                        </div> :
                        selectedOption === 1 ?
                            <div style={{ paddingTop: '20px', paddingLeft: '30px' }}>
                                {data.map((item) => (
                                    <button onClick={() => handlePayment(item.cartId, 2)} key={item.cartId} style={{backgroundColor : 'red', height : '30px', width : '60px'}}>Cancel</button>
                                ))}
                            </div> : null
                    }
                </div>
            </div>
        </div>
    )
}

export default Cart
