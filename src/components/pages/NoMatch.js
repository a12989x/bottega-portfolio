import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = () => {
    return (
        <div className="no-match">
            <p>Oops!</p>
            <h1>404 - Page not found</h1>
            <h3>
                The page you are looking for might have been removed had its
                name changed or is temporarily unavailable
            </h3>
            <button>
                <Link to="/">Go to Homepage</Link>
            </button>
        </div>
    );
};

export default NoMatch;
