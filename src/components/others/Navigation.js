import React from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navigation = (props) => {
    const dynamicLink = (route, linkText) => {
        return (
            <li>
                <NavLink to={route}>{linkText}</NavLink>
            </li>
        );
    };

    const handleSignOut = () => {
        axios
            .delete('https://api.devcamp.space/logout', {
                withCredentials: true,
            })
            .then((response) => {
                if (response.status === 200) {
                    props.history.push('/');
                    props.handleSuccessfulLogout();
                }
                return response.data;
            })
            .catch((error) => {
                console.log('handleSignOut', error);
            });
    };

    return (
        <nav className="navigation">
            <h2>
                <NavLink className="name" exact to="/">
                    A12989x
                </NavLink>
            </h2>

            <ul>
                <li>
                    <NavLink to="/about">About</NavLink>
                </li>

                <li>
                    <NavLink to="/contact">Contact</NavLink>
                </li>

                <li>
                    <NavLink to="/blog">Blog</NavLink>
                </li>

                {props.loggedInStatus === 'LOGGED_IN'
                    ? dynamicLink('/portfolio-manager', 'Portfolio Manager')
                    : null}

                {props.loggedInStatus === 'LOGGED_IN' ? (
                    <li>
                        <button className="sign-out" onClick={handleSignOut}>
                            <FontAwesomeIcon icon="sign-out-alt" />
                        </button>
                    </li>
                ) : null}
            </ul>
        </nav>
    );
};

export default withRouter(Navigation);
