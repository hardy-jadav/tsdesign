import React, { useEffect } from 'react';
import anime from 'animejs';
import {
    Code2, Cpu, Globe, Layers, GitBranch, Database, Layout, Smartphone
} from 'lucide-react';
import './Skills.css';

const skills = [
    { name: 'React.js', icon: <Code2 size={40} />, desc: 'Hooks, Context, Redux' },
    { name: 'Next.js', icon: <Globe size={40} />, desc: 'App Router, SSR' },
    { name: 'VueJS', icon: <Layers size={40} />, desc: 'Quasar Framework' },
    { name: 'TypeScript', icon: <Cpu size={40} />, desc: 'Type-safe Logic' },
    { name: 'Tailwind CSS', icon: <Layout size={40} />, desc: 'Shadcn UI' },
    { name: 'Figma', icon: <Smartphone size={40} />, desc: 'UI/UX Design' },
    { name: 'REST APIs', icon: <Database size={40} />, desc: 'Axios, Fetch' },
    { name: 'Azure DevOps', icon: <GitBranch size={40} />, desc: 'CI/CD, Agile' },
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
                        <div key={index} className="skill-card glass interactive">
                            <div className="skill-icon text-neon">
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
