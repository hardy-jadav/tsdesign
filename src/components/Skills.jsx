import React, { useEffect } from 'react';
import anime from 'animejs';
import { SiReact, SiNextdotjs, SiVuedotjs, SiTypescript, SiTailwindcss, SiFigma } from 'react-icons/si';
import { VscAzureDevops } from 'react-icons/vsc';
import { TbApi } from 'react-icons/tb';
import './Skills.css';

const skills = [
    { name: 'React.js', icon: <SiReact size={40} />, desc: 'Hooks, Context, Redux', color: '#61DAFB' },
    { name: 'Next.js', icon: <SiNextdotjs size={40} />, desc: 'App Router, SSR', color: '#ffffff' },
    { name: 'VueJS', icon: <SiVuedotjs size={40} />, desc: 'Quasar Framework', color: '#4FC08D' },
    { name: 'TypeScript', icon: <SiTypescript size={40} />, desc: 'Type-safe Logic', color: '#3178C6' },
    { name: 'Tailwind CSS', icon: <SiTailwindcss size={40} />, desc: 'Shadcn UI', color: '#06B6D4' },
    { name: 'Figma', icon: <SiFigma size={40} />, desc: 'UI/UX Design', color: '#F24E1E' },
    { name: 'REST APIs', icon: <TbApi size={40} />, desc: 'Axios, Fetch', color: '#00e5ff' },
    { name: 'Azure DevOps', icon: <VscAzureDevops size={40} />, desc: 'CI/CD, Agile', color: '#0078D7' },
];

const Skills = () => {
    useEffect(() => {
        anime({
            targets: '.skill-card',
            opacity: [0, 1],
            scale: [0.9, 1],
            delay: anime.stagger(100),
            easing: 'easeOutExpo',
            duration: 1000,
            autoplay: false,
        });

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                anime({
                    targets: '.skill-card',
                    opacity: [0, 1],
                    scale: [0.9, 1],
                    delay: anime.stagger(100),
                    easing: 'easeOutExpo',
                    duration: 1000,
                });
                observer.disconnect();
            }
        }, { threshold: 0.2 });

        const el = document.querySelector('.skills-grid');
        if (el) observer.observe(el);

        return () => observer.disconnect();
    }, []);

    return (
        <section id="skills" className="skills">
            <div className="container">
                <h2 className="section-title">My <span className="text-neon">Tech Stack</span></h2>
                <div className="skills-grid">
                    {skills.map((skill, index) => (
                        <div key={index} className="skill-card glass interactive" style={{ "--skill-color": skill.color }}>
                            <div className="skill-icon">
                                {skill.icon}
                            </div>
                            <h3>{skill.name}</h3>
                            <p>{skill.desc}</p>
                            <div className="skill-glow"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
