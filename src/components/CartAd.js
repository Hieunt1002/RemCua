import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { API_KEY } from '../utils/createAxios';
import { Link } from 'react-router-dom';

function CartAd() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchCartData(0);
    }, []);
    const fetchCartData = async () => {
        try {
            const response = await axios.get(`${API_KEY}/cart/MyOrder`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    };
    const handlePayment = async (option, status) => {
        try {
            const userData = {
                cartId: option,
                status: status
            };
            await axios.put(`${API_KEY}/cart`, userData);
            alert("Successfully.");
            fetchCartData();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div style={{ paddingTop: '50px', paddingBottom: '50px' }}>
            <div>
                <h1>ĐƠN HÀNG</h1>
                <hr />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <table>
                    <thead>
                        <tr>
                            <th style={{ paddingRight: '20px', paddingLeft: '20px' }}>Mã Order</th>
                            <th style={{ paddingRight: '20px', paddingLeft: '20px' }}>Trạng thái</th>
                            <th style={{ paddingRight: '20px', paddingLeft: '20px' }}>Hình ảnh</th>
                            <th style={{ paddingRight: '20px', paddingLeft: '20px' }}>Tên sản phẩm</th>
                            <th style={{ paddingRight: '20px', paddingLeft: '20px' }}>Số lượng</th>
                            <th style={{ paddingRight: '20px', paddingLeft: '20px' }}>Giá</th>
                            <th style={{ paddingRight: '20px', paddingLeft: '20px' }}>Tổng giá</th>
                            <th style={{ paddingRight: '20px', paddingLeft: '20px' }}>Loại sản phẩm</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <React.Fragment key={item.cartId}>
                                <tr style={{paddingTop : '10px'}}>
                                    <td style={{ paddingRight: '20px', paddingLeft: '20px'}}>
                                        <h5 className="product-titles">
                                            {item.cartId}
                                        </h5>
                                    </td>
                                    <td style={{ paddingRight: '20px', paddingLeft: '20px' }}>
                                        <div key={item.cartId}>
                                            {item.status === 1 ?
                                                <button onClick={() => handlePayment(item.cartId, 3)} style={{ backgroundColor: 'green', height: '30px', width: '60px' }}>
                                                    Accept
                                                </button>
                                                : item.status === 3 ? (
                                                    <button onClick={() => handlePayment(item.cartId, 4)} style={{ backgroundColor: 'blue', height: '30px', width: '60px' }}>
                                                        Done
                                                    </button>
                                                ) : item.status === 2 ? (
                                                    <p>Đã Hủy</p>
                                                ) : (
                                                    <p style={{color : 'blue'}}>Done</p>
                                                )}
                                        </div>
                                    </td>
                                </tr>
                                {item.cartDetail.map((index) => (
                                    <tr key={index.product.productId}>
                                        <td colSpan="2"></td>
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
                                            {index.product.brands.brandName}
                                        </td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CartAd
