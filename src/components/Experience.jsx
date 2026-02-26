import React, { useEffect } from 'react';
import anime from 'animejs';
import './Experience.css';

const experiences = [
    {
        company: 'Knovos India Pvt. Ltd.',
        role: 'Frontend / UI Developer',
        period: '2023 - Present',
        desc: 'Developing enterprise-grade applications using React.js and Ext JS. Implemented modular React architecture and complex client-side routing. Optimized rendering performance for large datasets.'
    },
    {
        company: 'Marwadi University',
        role: 'B.Tech in Computer Engineering',
        period: '2019 - 2023',
        desc: 'Graduated with CGPA 8.41. Focused on web technologies and UI development through various academic projects.'
    }
];

const Experience = () => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                anime({
                    targets: '.timeline-line',
                    height: ['0%', '100%'],
                    easing: 'easeInOutQuad',
                    duration: 1500
                });

                anime({
                    targets: '.timeline-item',
                    opacity: [0, 1],
                    translateX: (el, i) => i % 2 === 0 ? [50, 0] : [-50, 0],
                    delay: anime.stagger(300, { start: 500 }),
                    easing: 'easeOutExpo',
                    duration: 1000
                });
                observer.disconnect();
            }
        }, { threshold: 0.2 });

        const el = document.querySelector('.timeline-container');
        if (el) observer.observe(el);

        return () => observer.disconnect();
    }, []);

    return (
        <section id="experience" className="experience">
            <div className="container">
                <h2 className="section-title">My <span className="text-neon">Journey</span></h2>

                <div className="timeline-container">
                    <div className="timeline-line"></div>

                    {experiences.map((exp, index) => (
                        <div key={index} className={`timeline-item ${index % 2 === 0 ? 'right' : 'left'}`}>
                            <div className="timeline-dot text-neon"></div>
                            <div className="timeline-content glass interactive">
                                <span className="exp-period">{exp.period}</span>
                                <h3>{exp.role}</h3>
                                <h4 className="text-neon">{exp.company}</h4>
                                <p>{exp.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
