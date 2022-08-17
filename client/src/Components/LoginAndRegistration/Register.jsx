import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit= (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/register', user, { withCredentials: true }) 
            .then((res) => {
                console.log(res.data);
                navigate('/dashboard')
            })
            .catch((err) => {
                console.log(err.response.data.errors);
                setErrors(err.response.data.errors);
            });
    };

    return (
        <div className='container'>
            <h1 className='my-5'>Manga Mania</h1>
            <div className='d-flex justify-content-around'>
                <div className='registerStyle col-4'>
                    <form className='registerFormStyle' onSubmit={handleSubmit}> 
                        <h2>Register</h2>
                        <div className='align-items-center py-2'>
                            <div className='row'>
                                <div className='col'>
                                    <input
                                        type="text"
                                        placeholder='First name'
                                        name='firstName'
                                        onChange={handleChange}
                                        value={user.firstName}
                                        required
                                        className='form-control'
                                    />
                                    {errors.firstName && <span className="text-danger">{errors.firstName.message}</span>}
                                </div>
                                <div className='col'>
                                    <input
                                        type="text"
                                        placeholder='Last Name'
                                        name='lastName'
                                        onChange={handleChange}
                                        value={user.lastName}
                                        required
                                        className='form-control'
                                    />
                                    {errors.lastName && <span className="text-danger">{errors.lastName.message}</span>}
                                </div>
                            </div>
                        </div>
                        <div className='align-items-center py-3'>
                            <div className='col-auto'>
                                <input 
                                    type="text"
                                    placeholder='Username'
                                    name='username'
                                    onChange={handleChange}
                                    value={user.username}
                                    required
                                    className='form-control'
                                />
                                {errors.email && <span className="text-danger">{errors.email.message}</span>}
                            </div>
                        </div>
                        <div className='align-items-center py-3'>
                            <div className='col-auto'>
                                <input 
                                    type="email"
                                    placeholder='Email'
                                    name='email'
                                    onChange={handleChange}
                                    value={user.email}
                                    required
                                    className='form-control'
                                />
                                {errors.email && <span className="text-danger">{errors.email.message}</span>}
                            </div>
                        </div>
                        <div className='align-items-center py-3'>
                            <div className='col-auto'>
                                <input 
                                    type="password"
                                    placeholder='Password'
                                    name='password'
                                    onChange={handleChange}
                                    value={user.password}
                                    required
                                    className='form-control'
                                />
                                {errors.password && <span className="text-danger">{errors.password.message}</span>}
                            </div>
                        </div>
                        <div className='align-items-center py-3'>
                            <div className='col-auto'>
                                <input 
                                    type="password"
                                    placeholder='Confirm your password'
                                    name='confirmPassword'
                                    onChange={handleChange}
                                    value={user.confirmPassword}
                                    required
                                    className='form-control'
                                />
                                {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword.message}</span>}
                            </div>
                            <input type="text" name='profilePic' value='https://fredfloridalaw.com/wp-content/uploads/2021/12/PngItem_307416.png' hidden readOnly/>
                        </div>
                        <button className='btn btn-primary my-3'>Register</button>
                    </form>
                    <div className='loginFormStyle mt-3'>
                        <h5>Already have an account?</h5>
                        <Link to='/' style={{ textDecoration: "none" }}>
                            <button className='btn btn-success'>Login Here</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register