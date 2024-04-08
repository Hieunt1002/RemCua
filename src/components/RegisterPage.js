import React, { useState } from 'react'
import './Login.css';
import axios from 'axios';
import { API_KEY } from '../utils/createAxios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

function RegisterPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [phone, setPhone] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [address, setAdress] = useState('');
    const [error, setError] = useState('');
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Vui lòng nhập địa chỉ email hợp lệ.');
        } else {
            setError('');
        }
    };
    const validatePhone = () => {
        const cleanPhoneNumber = phone.replace(/\D/g, ''); // Loại bỏ tất cả các ký tự không phải số
        if (!cleanPhoneNumber || cleanPhoneNumber.length !== 10) {
            setError('Vui lòng nhập đủ 10 số');
        } else {
            setError('');
        }
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async () => {
        if (!email || !password || !phone || !fname || !lname || !address) {
            setError("Không được để trống");
            return;
        }
        if (password !== cpassword) {
            setError("Password không giống nhau");
            return;
        }
        validateEmail();
        validatePhone();
        try {
            const userData = {
                email: email,
                password: password,
                firstName: fname,
                lastName: lname,
                phoneNumber: phone,
                address: address
            };
            await axios.post(`${API_KEY}/user`, userData);
            alert("Bạn đã đăng ký thành công");
            navigate('/sign-up');
        } catch (error) {
            setError('Email đã tồn tại');
        }
    };

    return (
        <>
            <div class="overlay"></div>
            <div class="login-container" >
                <div>
                    <div class="logo">
                        <i class="fas fa-hat-wizard"></i>
                        <span>Rèm Cửa Như Ý</span>
                    </div>
                    <div class="register">
                        <div>Don't have an account?</div>
                        <p>Register to access all the features of our services. Manage your business in one place. It's free</p>
                        <div class="social">
                            <a data-toggle="tooltip" title="Facebook" href=""><i class="fab fa-facebook-f"></i></a>
                            <a data-toggle="tooltip" title="Google" href=""><i class="fab fa-google"></i></a>
                            <a data-toggle="tooltip" title="Pinterest" href=""><i class="fab fa-pinterest-p"></i></a>
                            <a data-toggle="tooltip" title="Github" href=""><i class="fab fa-github"></i></a>
                        </div>
                    </div>
                </div>

                <div class="form-login">
                    <div class="form" style={{ marginTop: '-90px' }}>
                        <h3 class="heading">Sign up</h3>
                        {error &&
                            <p style={{ color: 'red' }}>{error}</p>}
                        <div class="form-group">
                            <label for="email" class="form-label">Email</label>
                            <input value={email} onChange={handleEmailChange} type="text" placeholder="VD: email@domain.com" class="form-control" />
                            <span class="form-message"></span>
                        </div>

                        <div class="form-group">
                            <label for="password" class="form-label">Password</label>
                            <input value={password} onChange={handlePasswordChange} type="password" placeholder="Enter password" class="form-control" />
                            <span class="form-message"></span>
                        </div>
                        <div class="form-group">
                            <label for="email" class="form-label">Confirm Password</label>
                            <input value={cpassword} onChange={(e) => setCpassword(e.target.value)} type="password" placeholder="Enter password" class="form-control" />
                            <span class="form-message"></span>
                        </div>
                        <div class="form-group">
                            <label for="email" class="form-label">LastName</label>
                            <input value={lname} onChange={(e) => setLname(e.target.value)} type="text" placeholder="VD: Văn A" class="form-control" />
                            <span class="form-message"></span>
                        </div>
                        <div class="form-group">
                            <label for="email" class="form-label">FirstName</label>
                            <input value={fname} onChange={(e) => setFname(e.target.value)} type="text" placeholder="VD: Nguyễn" class="form-control" />
                            <span class="form-message"></span>
                        </div>

                        <div class="form-group">
                            <label for="email" class="form-label">Phone</label>
                            <input value={phone} onChange={e => setPhone(e.target.value)} type="text" placeholder="VD: 0987654321" class="form-control" />
                            <span class="form-message"></span>
                        </div>
                        <div class="form-group">
                            <label for="email" class="form-label">Address</label>
                            <input value={address} onChange={e => setAdress(e.target.value)} type="text" placeholder="VD: Hà Nội" class="form-control" />
                            <span class="form-message"></span>
                        </div>
                        <div class="sign-ups">
                            <div>
                                <button onClick={handleLogin} class="form-submit">Sign up</button>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                            <Link to={`/sign-up`}>Have an account?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterPage
