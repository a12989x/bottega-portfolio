import React from 'react';
import { Link } from 'react-router-dom';

import Portfolio from '../portfolio/Portfolio';
import CodeReview from '../../img/code_review.min.svg';

const Home = (props) => {
    return (
        <section className="home">
            <main>
                <div className="text">
                    <h1 className="text__title">
                        Hi,
                        <br />
                        I'm
                        {/* <br /> */}
                        <span> A12989x</span>,
                        <br />
                        Web Development
                    </h1>

                    <p className="text__skills">css / javascript / react</p>

                    <button className="text__contact-button button">
                        <Link to="/about">Contact Me</Link>
                    </button>
                </div>

                <div className="image">
                    <img alt="code-review" src={CodeReview} />
                </div>

                {/* <img className="scroll" alt="scroll" src={Scroll} 
                /> */}
                <svg
                    id="a594ac37-6d44-4297-8862-151cbhsj"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="90"
                    viewBox="0 0 50 130"
                >
                    <rect
                        id="scroll"
                        x="0"
                        y="5"
                        rx="25"
                        ry="25"
                        width="50"
                        height="120"
                        stroke="#a181ff"
                        fill="#e0e5ec"
                        strokeWidth="4"
                    ></rect>
                    <circle
                        id="circle--shape"
                        cx="25"
                        cy="32"
                        r="8"
                        fill="#a181ff"
                    ></circle>
                </svg>
            </main>

            <Portfolio />
        </section>
    );
};

export default Home;
