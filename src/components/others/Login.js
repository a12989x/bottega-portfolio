import React, { useState } from 'react';
import { useForm } from '../others/useForm';
import axios from 'axios';

const Login = (props) => {
    const [values, handleChange] = useForm({ email: '', password: '' });
    const [errorText, setErrorText] = useState('');

    const handleSubmit = (e) => {
        axios
            .post(
                'https://api.devcamp.space/sessions',
                {
                    client: { email: values.email, password: values.password },
                },
                { withCredentials: true }
            )
            .then((response) => {
                if (response.data.status === 'created') {
                    props.handleSuccessfulAuth();
                    setErrorText('success');
                } else {
                    props.handleUnSuccessfulAuth();
                    setErrorText('email or password incorrect');
                }

                console.log(response.data.status);
            })
            .catch((error) => {
                console.log(error);
                setErrorText('An error ocurred');
            });

        e.preventDefault();
    };

    return (
        <div className="login">
            <h1 className="login-title">Login</h1>
            <p className="login-error">{errorText}</p>

            <form onSubmit={handleSubmit} className="login-form">
                <label>
                    E-mail
                    <input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Password
                    <input
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                    />
                </label>

                <button>Login</button>
            </form>
        </div>
    );
};

export default Login;
