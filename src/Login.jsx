import React, {useState, useRef, useEffect}from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import axios from 'axios';

const Login = () => {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }
        try {
            const response = await axios.post("https://reqres.in/api/login", {
                email,
                password
            }).then((response) => {
                console.log(response.data);
                const data = response.data;
                if (data.token) {
                    localStorage.setItem("token", JSON.stringify(data.token));
                    setIsLoggedIn(true);
                    navigate("/userslist");
                } else {
                    setError(data.error || "Login failed. Please try again.");
                }
            }
            ).catch((error) => {
                console.log(error);
                setError("An error occurred. Please try again later.");
            });
        } catch (error) {
            console.log(error);
            setError("An error occurred. Please try again later.");
        }}

    return (
        <div className="loginContainer">
            <div className="login">
                <h1>User Login</h1>
                <div className="form">
                    <form onSubmit={handleLogin} action="">
                        <div className="formContainer">
                            <div className='Input'>
                                <input type="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className='Input'>
                                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            {error && <label className="error">{error}</label>}
                            <button type="submit">Log In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login