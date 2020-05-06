import React from 'react';

const Loader = () => {
    return (
        <div className="loader">
            {/* <div className="loader__spinner"></div> */}

            <svg>
                <circle cx="70" cy="70" r="70"></circle>
            </svg>

            <div className="loader__dots">
                <div className="bounce"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div>
        </div>
    );
};

export default Loader;
