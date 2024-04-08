import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_KEY } from '../utils/createAxios';

function Customer() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchCartData(0);
    }, []);
    const fetchCartData = async () => {
        try {
            const response = await axios.get(`${API_KEY}/user/listUser`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    };
    const handleRoleChange = async (selectedRoleId, userid) => {
        try {
            await axios.put(`${API_KEY}/user/updaterole?userid=${userid}&roleId=${selectedRoleId}`);
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
                            <th style={{ paddingRight: '20px', paddingLeft: '20px' }}>MND</th>
                            <th style={{ paddingRight: '20px', paddingLeft: '20px' }}>Hình ảnh</th>
                            <th style={{ paddingRight: '20px', paddingLeft: '20px' }}>Email</th>
                            <th style={{ paddingRight: '20px', paddingLeft: '20px' }}>Tên</th>
                            <th style={{ paddingRight: '20px', paddingLeft: '20px' }}>Số điện thoại</th>
                            <th style={{ paddingRight: '20px', paddingLeft: '20px' }}>Địa điểm</th>
                            <th style={{ paddingRight: '20px', paddingLeft: '20px' }}>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr style={{ paddingTop: '10px' }}>
                                <td style={{ paddingRight: '20px', paddingLeft: '20px' }}>
                                    <h5 className="product-titles">
                                        {item.userId}
                                    </h5>
                                </td>
                                <td style={{ paddingRight: '20px', paddingLeft: '20px' }}>
                                    <img style={{ height: '100px', borderRadius: '10px' }} src={item.uImg} alt="" />
                                </td>
                                <td style={{ paddingRight: '20px', paddingLeft: '20px' }}>
                                    <h5 className="product-titles">{item.email}</h5>
                                </td>
                                <td style={{ paddingRight: '20px', paddingLeft: '20px' }}>
                                    <h5 className="product-titles">{item.firstName} {item.lastName}</h5>
                                </td>
                                <td style={{ paddingRight: '20px', paddingLeft: '20px' }}>
                                    <h5 className="product-titles">{item.phoneNumber}</h5>
                                </td>
                                <td style={{ paddingRight: '20px', paddingLeft: '20px' }}>
                                    <h5 className="product-titles">{item.address}</h5>
                                </td>
                                <td style={{ paddingRight: '20px', paddingLeft: '20px' }}>
                                    <select value={item.roleId} onChange={(e) => handleRoleChange(e.target.value, item.userId)}>
                                        <option value={1}>Admin</option>
                                        <option value={2}>User</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Customer
