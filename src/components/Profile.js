import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_KEY } from '../utils/createAxios';
import { useNavigate } from 'react-router';
import Modal from 'react-modal';


function Profile() {
    const navigate = useNavigate();
    const [data, setData] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false);

    const user = localStorage.getItem('user');
    const fetchCartData = async () => {
        try {
            const response = await axios.get(`${API_KEY}/user/UserInfor?id=${user}`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching cart data:', error);
        }
    };
    useEffect(() => {
        fetchCartData();
    }, []);
    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '60%',
        },
    };
    let subtitle;
    function afterOpenModal() {
        subtitle.style.color = '#f00';
    }
    const validateUserData = (userData) => {
        if (!userData.userId || !userData.firstName || !userData.lastName) {
            throw new Error("Missing required fields");
        }
        if (userData.phoneNumber && !isValidPhoneNumber(userData.phoneNumber)) {
            throw new Error("Invalid phone number");
        }
        return true;
    };
    
    const isValidPhoneNumber = (phoneNumber) => {
        const phoneRegex = /^\d{10}$/; 
        return phoneRegex.test(phoneNumber);
    };
    try {
        validateUserData(data);
        console.log("User data is valid");
    } catch (error) {
        console.error("Validation error:", error.message);
    }
    
    const handleUpdate = async () => {
        try {
            validateUserData(data);
            const userData = {
                userId: data.userId,
                uImg: data.uImg,
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phoneNumber,
                address: data.address,
            };
            await axios.put(`${API_KEY}/user`, userData);
            alert("Successful");
            await window.location.reload();
        } catch (error) {
            console.error("Error occurred while updating user data:", error);
            alert("An error occurred while updating user data. Please try again later.");
        }
    };
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '50px', textAlign: 'center' }}>
                <img src={data.uImg} style={{ height: '300px', width: '300px', borderRadius: '50%' }} />
                <div style={{ marginRight: '40px', paddingTop: '50px', paddingLeft: '40px' }}>
                    <h2>Tên người dùng</h2>
                    <h4 style={{ paddingTop: '20px' }}>{data.firstName} {data.lastName}</h4>
                    <h2 style={{ paddingTop: '20px' }}>Phone</h2>
                    <h4 style={{ paddingTop: '20px' }}>{data.phoneNumber}</h4>
                </div>
                <div style={{ marginLeft: '40px', paddingTop: '30px' }}>
                    <h2 style={{ paddingTop: '20px' }}>Địa chỉ</h2>
                    <h4 style={{ paddingTop: '20px' }}>{data.address}</h4>
                    <h2 style={{ paddingTop: '20px' }}>Email</h2>
                    <h4 style={{ paddingTop: '20px' }}>{data.email}</h4>
                </div>
            </div>
            <div style={{ paddingBottom: '50px', justifyContent: 'center', display: 'flex' }}>
                <button onClick={openModal} style={{ width: '250px', height: '50px' }}>Cập nhật thông tin cá nhân</button>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{ textAlign: 'center' }}>Update Profile</h2>
                <button onClick={closeModal} style={{ marginLeft: '90%', backgroundColor: 'red' }}>close</button>
                <img style={{ width: '100px', height: '100px', borderRadius: '50%', marginLeft: '46%' }} src={data.uImg} />
                <div style={{ justifyContent: 'center', display: 'flex' }}>
                    <div style={{ paddingRight: '40px' }}>
                        <div>
                            <p>First Name</p>
                            <input value={data.firstName} onChange={(e) => setData({ ...data, firstName: e.target.value })}
                                type='text' style={{ width: '400px', height: '30px' }} />
                        </div>
                        <div>
                            <p>Last Name</p>
                            <input value={data.lastName} onChange={(e) => setData({ ...data, lastName: e.target.value })}
                                type='text' style={{ width: '400px', height: '30px' }} />
                        </div>
                        <div>
                            <p>Số Điện Thoại</p>
                            <input value={data.phoneNumber}
                                onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
                                style={{ width: '400px', height: '30px' }} />
                        </div>
                    </div>
                    <div style={{ paddingLeft: '40px' }}>
                        <div>
                            <p>Link Hình ảnh</p>
                            <input value={data.uImg}
                                onChange={(e) => setData({ ...data, uImg: e.target.value })}
                                type='text' style={{ width: '400px', height: '30px' }} />
                        </div>
                        <div>
                            <p>Địa chỉ</p>
                            <input value={data.address}
                                onChange={(e) => setData({ ...data, address: e.target.value })}
                                type='text' style={{ width: '400px', height: '30px' }} />
                        </div>
                    </div>
                </div>
                <button
                    style={{
                        marginLeft: '49%',
                        height: '40px',
                        width: '70px',
                        backgroundColor: 'greenyellow',
                        fontSize: '18px'
                    }} onClick={handleUpdate}>
                    Update
                </button>
            </Modal>
        </>
    )
}

export default Profile
