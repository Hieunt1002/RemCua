import React, { useState } from 'react'
import './Login.css';
import axios from 'axios';
import { API_KEY } from '../utils/createAxios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        const userData = {
            email: email,
            password: password
        };
        axios.post(`${API_KEY}/user/login`, userData)
            .then(response => {
                if(response.data.success === false) {
                    alert("Email or password is wrong");
                    return;
                }
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', response.data.data.userId);

                if (response.data.data.roles.roleName === 'Admin') {
                    navigate('/productAdmin');
                }else{
                    navigate('/');
                }
            })
            .catch(error => {
                console.error('Login error:', error);
            });
    };

    return (
        <>
            <div class="overlay"></div>
            <div class="login-container">
                <div>
                    <div class="logo">
                        <i class="fas fa-hat-wizard"></i>
                        <span>Rèm Cửa Như Ý</span>
                    </div>
                    <div class="register">
                        <div>Have an account?</div>
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
                    <div class="form">
                        <h3 class="heading">Sign in</h3>
                        <div class="spacer"></div>

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

                        <div class="form-group f-term">
                            <input id="agree" name="agree" type="checkbox" class="form-control" />
                            <label for="agree" class="form-label">I agree to the all statements in</label>
                            <span class="form-message"></span>
                        </div>

                        <div class="sign-ups">
                            <div>
                                <button onClick={handleLogin} class="form-submit">Sign in</button>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                            <Link to={`/register`}>Don't have an account?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
