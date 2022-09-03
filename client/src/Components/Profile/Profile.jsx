import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import { useParams } from 'react-router-dom';

const Profile = () => {
    const { id } = useParams();
    const [userErrors, setUserErrors] = useState({});
    const [userShippingErrors, setUserShippingErrors] = useState({});
    const [userBillingErrors, setUserBillingErrors] = useState({});
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    const [userShipping, setUserShipping] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        phoneNumber: '',
    });

    const [userBilling, setUserBilling] = useState({
        fullName: '',
        cardNumber: '',
        expirationMonth: '',
        expirationYear: '',
    });

    // Basic user information on change handle
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    // Shipping information on change handle
    const handleShippingChange = (e) => {
        setUserShipping({
            ...userShipping,
            [e.target.name]: e.target.value,
        });
    };

    // Billing information on change handle
    const handleBillingChange = (e) => {
        setUserBilling({
            ...userBilling,
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
                if (res.data.shippingAddress) {
                    setUserShipping(res.data.shippingAddress);
                }
                if (res.data.billingInformation) {
                    setUserBilling(res.data.billingInformation);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Handle for editing main profile data
    const submitProfileHandler = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8000/api/users/${id}`, user, { credentials: 'include', withCredentials: true })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response);
                setUserErrors(err.data);
            })
    };

    // Handle for editing shipping info
    const submitShippingHandler = (e) => {
        console.log(userShipping);
        e.preventDefault();
        axios
            .put(`http://localhost:8000/api/users/${id}`, 
            {
                shippingAddress: {...userShipping}
            }, 
            { credentials: 'include', withCredentials: true })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log('Error while updating shipping handler - ', err);
                setUserShippingErrors(err.data)
            })
    };

    // Handle for editing billing info
    const submitBillingHandler = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8000/api/users/${id}`, 
            {
                billingInformation: {...userBilling}
            }, 
            { credentials: 'include', withCredentials: true })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log('Error while updating billing handler - ', err);
                setUserBillingErrors(err.data)
            })
    };

    return (
        <div>
            <Header />
            <div className='container profileContainer'>
                <div className='row'>
                    <h1 className='mt-2'>Your Profile Page</h1>
                </div>
                <div>
                    <form className='form-container d-flex justify-content-center my-3' onSubmit={submitProfileHandler}>
                        <div className='col-4 mx-5'>
                            <div className='row my-4'>
                                <div className='col'>
                                    <div className='form-floating'>
                                        <input
                                            type="text"
                                            name='firstName'
                                            id='firstName'
                                            value={user.firstName}
                                            className='form-control'
                                            onChange={handleChange}
                                            required
                                        />
                                    <label htmlFor="firstName">First Name</label>
                                    {userErrors.firstName && <span className="text-danger">{userErrors.firstName.message}</span>}
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className='form-floating'>
                                        <input
                                            type="text"
                                            name='lastName'
                                            id='lastName'
                                            value={user.lastName}
                                            className='form-control'
                                            onChange={handleChange}
                                            required
                                        />
                                        <label htmlFor="lastName">Last Name</label>
                                        {userErrors.lastName && <span className="text-danger">{userErrors.lastName.message}</span>}
                                    </div>
                                </div>
                            </div>
                            <div className='row align-items-center'>
                                <div className='form-floating'>
                                    <input
                                        type="email"
                                        name='email'
                                        id='email'
                                        value={user.email}
                                        className='form-control'
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="email" className='px-4'>Email</label>
                                    {userErrors.email && <span className="text-danger">{userErrors.email.message}</span>}
                                </div>
                            </div>
                            <div className='align-items-center mt-4 mb-4'>
                                <button className='btn btn-primary'>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='d-flex justify-content-between'>
                    <div className='col-5'>
                        <h2 className='pb-2'>Shipping Information</h2>
                        <form onSubmit={submitShippingHandler}>
                            <div>
                                <div className='row align-items-center'>
                                    <div className='form-floating'>
                                        <input
                                            type="text"
                                            name='street'
                                            value={userShipping.street}
                                            className='form-control'
                                            onChange={handleShippingChange}
                                            required
                                        />
                                        <label htmlFor="fullName" className='px-4'>Street</label>
                                        {userShippingErrors.street && <span className="text-danger">{userShippingErrors.street.message}</span>}
                                    </div>
                                </div>
                                <div className='align-items-center'>
                                    <div className='row'>
                                        <div className='form-floating col'>
                                            <input
                                                type="text"
                                                name='city'
                                                value={userShipping.city}
                                                className='form-control'
                                                onChange={handleShippingChange}
                                                required
                                            />
                                            <label htmlFor="fullName" className='px-4'>City</label>
                                            {userShippingErrors.city && <span className="text-danger">{userShippingErrors.city.message}</span>}
                                        </div>
                                        <div className='form-floating col'>
                                            <input
                                                type="text"
                                                name='state'
                                                value={userShipping.state}
                                                className='form-control'
                                                onChange={handleShippingChange}
                                                required
                                            />
                                            <label htmlFor="fullName" className='px-4'>State</label>
                                            {userShippingErrors.state && <span className="text-danger">{userShippingErrors.state.message}</span>}
                                        </div>
                                        <div className='form-floating col'>
                                            <input
                                                type="number"
                                                name='zipCode'
                                                value={userShipping.zipCode}
                                                className='form-control'
                                                onChange={handleShippingChange}
                                                required
                                            />
                                            <label htmlFor="fullName" className='px-4'>Zip Code</label>
                                            {userShippingErrors.zipCode && <span className="text-danger">{userShippingErrors.zipCode.message}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className='row align-items-center'>
                                    <div className='form-floating'>
                                        <input
                                            type="tel"
                                            name='phoneNumber'
                                            value={userShipping.phoneNumber}
                                            className='form-control'
                                            onChange={handleShippingChange}
                                            required
                                        />
                                        <label htmlFor="fullName" className='px-4'>Phone Number</label>
                                        {userShippingErrors.phoneNumber && <span className="text-danger">{userShippingErrors.phoneNumber.message}</span>}
                                    </div>
                                    <div className='align-items-center mt-4 mb-4'>
                                        <button className='btn btn-success'>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='col-6'>
                        <h2>Billing Information</h2>
                        <form onSubmit={submitBillingHandler}>
                                <div className='d-flex align-items-center'>
                                    <div className='row'>
                                        <div className='form-floating col-auto'>
                                            <input
                                                type="text"
                                                name='fullName'
                                                id='fullName'
                                                value={userBilling.fullName}
                                                className='form-control'
                                                onChange={handleBillingChange}
                                                required
                                            />
                                            <label htmlFor="fullName" className='px-4'>Full Name</label>
                                            {userBillingErrors.fullName && <span className="text-danger">{userBillingErrors.fullName.message}</span>}
                                        </div>
                                            <div className='form-floating col'>
                                                <input
                                                type="number"
                                                name='expirationMonth'
                                                id='expirationMonth'
                                                value={userBilling.expirationMonth}
                                                className='form-control'
                                                onChange={handleBillingChange}
                                                min='1'
                                                max='12'
                                                required
                                            />
                                                <label htmlFor="expirationMonth" className='px-4'>Expiration Month</label>
                                                {userBillingErrors.expirationMonth && <span className="text-danger">{userBillingErrors.expirationMonth.message}</span>}
                                            </div>
                                            <div className='form-floating col'>
                                                <input
                                                    type="number"
                                                    name='expirationYear'
                                                    id='expirationYear'
                                                    value={userBilling.expirationYear}
                                                    className='form-control'
                                                    onChange={handleBillingChange}
                                                    min='22'
                                                    required
                                                />
                                                <label htmlFor="expirationMonth" className='px-4'>Expiration Year</label>
                                                {userBillingErrors.expirationYear && <span className="text-danger">{userBillingErrors.expirationYear.message}</span>}
                                            </div>
                                    </div>
                                </div>
                            <div className='align-items-center mt-4 mb-4'>
                                <button className='btn btn-success'>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
