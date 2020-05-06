import React from 'react';
import Login from '../others/Login';

const Auth = (props) => {
    const handleSuccessfulAuth = () => {
        props.handleSuccessfulLogin();
        props.history.push('/');
    };

    const handleUnSuccessfulAuth = () => {
        props.handleUnSuccessfulLogin();
    };

    return (
        <Login
            handleSuccessfulAuth={handleSuccessfulAuth}
            handleUnSuccessfulAuth={handleUnSuccessfulAuth}
        />
    );
};

export default Auth;
