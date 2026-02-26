import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { ExternalLink, Github } from 'lucide-react';
import './Projects.css';

const projects = [
    {
        title: 'Sarkari Jamay',
        desc: 'High-traffic EdTech platform with 20,000+ users. Features complex quiz interfaces, state persistence, and cross-platform behavior using Capacitor.',
        tech: ['Next.js 16', 'React 19', 'Tailwind', 'Capacitor'],
        image: '/sarkarijamay-thumb.png',
        live: 'https://sarkarijamay.com',
        github: '#'
    },
    {
        title: 'E-Discovery Platform',
        desc: 'Enterprise-grade legal platform featuring case management dashboards, evidence review modules, and advanced search with real-time filtering.',
        tech: ['React.js', 'Redux', 'REST API', 'Figma'],
        image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800',
        live: '#',
        github: '#'
    },
    {
        title: 'Railing World',
        desc: 'Production-ready business website with mobile-first design, interactive inquiry forms, and responsive UI principles.',
        tech: ['React.js', 'React Router', 'CSS3', 'Responsive Design'],
        image: '/railingworld-thumb.png',
        live: 'https://railingworld.in',
        github: '#'
    }
];

const ProjectCard = ({ project }) => {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (card) {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        }
    };

    return (
        <div
            className="project-card glass transition-slow"
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="project-image-wrapper">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                    <div className="project-links">
                        <a href={project.github} className="link-icon interactive"><Github /></a>
                        <a href={project.live} className="link-icon interactive"><ExternalLink /></a>
                    </div>
                </div>
            </div>
            <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <div className="project-tech">
                    {project.tech.map((t, i) => (
                        <span key={i} className="tech-tag">{t}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Projects = () => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                anime({
                    targets: '.project-card',
                    opacity: [0, 1],
                    translateY: [100, 0],
                    delay: anime.stagger(200),
                    easing: 'easeOutExpo',
                    duration: 1200
                });
                observer.disconnect();
            }
        }, { threshold: 0.1 });

        const el = document.querySelector('.projects-grid');
        if (el) observer.observe(el);

        return () => observer.disconnect();
    }, []);

    return (
        <section id="projects" className="projects">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Selected <span className="text-neon">Projects</span></h2>
                    <p className="section-subtitle">A glimpse into some of my recent digital creations.</p>
                </div>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
