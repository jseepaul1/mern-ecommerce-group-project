import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout= (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:8000/api/users/logout', { withCredentials: true }) 
            .then((res) => {
                console.log(res);
                navigate('/')
            })
            .catch((err) => {
                console.log(err.response);
                // setRegisterErrors(err.response);
            });
    };

    return (
    <div>
        <h1>Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
    </div>
    )
}

export default Dashboard
