import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import loginSignupImage from "../images/login-animation.gif";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    const handleShowPassword = () => {
        setShowPassword((preve) => !preve);
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((preve) => ({ ...preve, [name]: value }));
    };

    const handleOnSubmit = (async (e) => {
        e.preventDefault();
        const { email, password } = data;
        if (email && password) {
            const fetchData = await fetch('https://localhost:7180/api/user/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            const dataRes = await fetchData.json();
            console.log(dataRes.message)
            toast(dataRes.message)
            if (dataRes.alert) {
                navigate("/");
            }
        } else {
            alert("please enter required fields");
        }
    });

    return (
        <div className="container">
            <div className="container-login">
                <div className="login-image">
                    <img src={loginSignupImage} className="login-image img" />
                </div>

                <form className="login-form" onSubmit={handleOnSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="input ip-email"
                        value={data.email}
                        onChange={handleOnChange}
                    />

                    <label htmlFor="password">Password</label>
                    <div className="input ip">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            className="ip-password"
                            value={data.password}
                            onChange={handleOnChange}
                        />

                        <span className="showPword" onClick={handleShowPassword}>
                            {showPassword ? <BiShow /> : <BiHide />}
                        </span>
                    </div>
                    <button type="submit" className="btn-submit-login">
                        Login
                    </button>
                </form>
                <p className="signup-text">
                    Don't have account? <Link to={"/sign-up"}>Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
