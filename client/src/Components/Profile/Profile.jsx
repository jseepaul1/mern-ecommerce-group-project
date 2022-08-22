import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [user, setUser] = useState({

    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    // Get current user
    useEffect(() => {
        axios
            .get("http://localhost:8000/api/user", { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.data)
            });
    }, []);

    // Submit button for editing profile 
    const submitHandler = (e) => {
        axios
            .put(`http://localhost:8000/api/users/${user._id}`, user, { withCredentials: true })
            .then((res) => {
                console.log(res);
                navigate('/dashboard');
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    return (
    <div>
        <Header />
        <div className='container profileContainer'>
            <div className='row'>
                <h1 className='my-4'>Your Profile Page</h1>
            </div>
            <form className='form d-flex justify-content-center mt-2' onSubmit={submitHandler}>
                <div className='col-4 mx-5'>
                    <div className='row my-4'>
                        <div className='col'>
                            <div className='form-group'>
                                <input
                                    type="text"
                                    name='firstName'
                                    value={user.firstName}
                                    className='form-control'
                                    onChange={handleChange}
                                    required
                                />
                            <div className='form-text'>First Name:</div>
                            {errors.firstName && <span className="text-danger">{errors.firstName.message}</span>}
                            </div>
                        </div>
                        <div className='col'>
                            <div className='form-group'>
                                <input
                                    type="text"
                                    name='lastName'
                                    value={user.lastName}
                                    className='form-control'
                                    onChange={handleChange}
                                    required
                                />
                                <div className='form-text'>Last Name:</div>
                                {errors.lastName && <span className="text-danger">{errors.lastName.message}</span>}
                            </div>
                        </div>
                    </div>
                    <div className='row align-items-center'>
                        <div className='form-group'>
                            <input
                                type="email"
                                name='email'
                                value={user.email}
                                className='form-control'
                                onChange={handleChange}
                                required
                            />
                            <div className='form-text'>Email:</div>
                            {errors.email && <span className="text-danger">{errors.email.message}</span>}
                        </div>
                    </div>
                    <div className='align-items-center mt-4'>
                        <button className='btn btn-success'>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    )
}

export default Profile
