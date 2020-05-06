import React from 'react';

const Contact = (Submit) => {
    return (
        <div className="contact">
            <h1 className="contact__title">Contact Me</h1>
            <form className="form">
                <label className="form__name">
                    Name
                    <input type="text"></input>
                </label>

                <label className="form__email">
                    E-mail
                    <input type="email"></input>
                </label>

                <label className="form__email">
                    Tel Number
                    <input type="text"></input>
                </label>

                <label className="form__message">
                    Message
                    <textarea></textarea>
                </label>

                <button className="form__button">Submit</button>
            </form>
        </div>
    );
};

export default Contact;
