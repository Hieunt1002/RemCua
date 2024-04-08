import React, { useState } from 'react'
import './Login.css';
import axios from 'axios';
import { API_KEY } from '../utils/createAxios';
import { useNavigate } from 'react-router-dom';

function ResetPass() {
    const navigate = useNavigate();
    const [cpassword, setCpassword] = useState('');
    const [password, setPassword] = useState('');
    const user = localStorage.getItem('user');

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleUpdate = async () => {
        try {
            if (!password.trim()) {
                alert("Password cannot be empty");
                return;
            }
            if (password !== cpassword) {
                alert("Passwords do not match");
                return;
            }
    
            await axios.put(`${API_KEY}/user/changepass?userid=${user}&pass=${password}`)
                .then(response => {
                    alert("Update successful");
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    navigate("/");
                })
                .catch(error => {
                    console.error('Password change error:', error);
                    alert("An error occurred while updating the password. Please try again later.");
                });
        } catch (error) {
            console.error("Error occurred while updating user data:", error);
            alert("An error occurred while updating user data. Please try again later.");
        }
    };
    

    return (
        <>
            <div class="overlay" style={{ paddingRight: '100px' }}></div>
            <div class="login-container" >
                <div>
                    <div class="logo">
                        <i class="fas fa-hat-wizard"></i>
                        <span>Rèm Cửa Như Ý</span>
                    </div>
                    <div class="register">
                        <div>Change Password?</div>
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
                        <h3 class="heading">Change Password</h3>
                        <div class="spacer"></div>

                        <div class="form-group">
                            <label for="email" class="form-label">Confirm Password</label>
                            <input value={cpassword} onChange={(e) => setCpassword(e.target.value)} type="password" placeholder="Enter password" class="form-control" />
                            <span class="form-message"></span>
                        </div>

                        <div class="form-group">
                            <label for="password" class="form-label">Password</label>
                            <input value={password} onChange={handlePasswordChange} type="password" placeholder="Enter password" class="form-control" />
                            <span class="form-message"></span>
                        </div>

                        <div class="sign-ups">
                            <div>
                                <button onClick={handleUpdate} class="form-submit">Change</button>
                                <i class="fas fa-chevron-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPass
