import React from 'react';
import Hacker from '../../img/hacker-mindset.svg';

const About = () => {
    return (
        <div className="about">
            <main className="content">
                <h1 className="content__header">A12989x</h1>
                <p className="content__skills">HTML / CSS / JAVASCRIPT</p>
                <p className="content__description">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                    natoque penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. Donec quam felis, ultricies nec, pellentesque
                    eu, pretium quis, sem. Nulla consequat massa quis enim.
                    Donec pede justo, fringilla vel, aliquet nec, vulputate
                    eget, arcu. In enim justo, rhoncus ut, imperdiet a,
                    venenatis
                </p>
            </main>
            <section>
                <img src={Hacker} />
            </section>
        </div>
    );
};

export default About;
