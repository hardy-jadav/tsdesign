import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import './About.css';

const About = () => {
    const statsRef = useRef(null);

    const animateStats = () => {
        anime({
            targets: '.stat-number',
            innerHTML: [0, (el) => el.getAttribute('data-target')],
            round: 1,
            easing: 'easeOutExpo',
            duration: 2000,
        });
    };

    const animateAbout = () => {
        anime({
            targets: '.about-card',
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutQuad'
        });
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    animateAbout();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        if (statsRef.current) observer.observe(statsRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <section id="about" className="about">
            <div className="container">
                <h2 className="section-title"><span className="text-neon">About</span> Me</h2>

                <div className="about-grid">
                    <div className="about-card glass">
                        <h3>Who I Am</h3>
                        <p>
                            Professional Frontend Developer with 2.5 years of experience specializing in React.js,
                            component-driven architecture, and enterprise UI development. Strong experience in
                            translating Figma designs into pixel-perfect interfaces and optimizing rendering performance.
                        </p>
                        <p>
                            I have worked on complex legal domain products and high-traffic EdTech platforms,
                            ensuring accessibility and cross-browser compatibility while delivering reliable
                            frontend solutions within Agile teams.
                        </p>
                    </div>

                    <div className="stats-grid" ref={statsRef}>
                        <div className="stat-card glass interactive">
                            <span className="stat-number" data-target="2.5">0</span>
                            <span className="stat-plus"></span>
                            <p className="stat-label">Years of Experience</p>
                        </div>
                        <div className="stat-card glass interactive">
                            <span className="stat-number" data-target="3">0</span>
                            <span className="stat-plus">+</span>
                            <p className="stat-label">Major Projects</p>
                        </div>
                        <div className="stat-card glass interactive">
                            <span className="stat-number" data-target="20">0</span>
                            <span className="stat-plus">K+</span>
                            <p className="stat-label">Active Users</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
