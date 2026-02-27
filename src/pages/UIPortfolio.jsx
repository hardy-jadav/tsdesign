import React, { useEffect } from 'react';
import anime from 'animejs';
import { ExternalLink, Eye } from 'lucide-react';
import './UIPortfolio.css';

const UIPortfolio = () => {
    useEffect(() => {
        // Stagger animation for portfolio cards
        anime({
            targets: '.portfolio-card',
            translateY: [50, 0],
            opacity: [0, 1],
            delay: anime.stagger(100, { start: 200 }),
            easing: 'easeOutExpo',
            duration: 1000
        });

        // Title reveal
        anime({
            targets: '.page-header h1',
            translateY: [30, 0],
            opacity: [0, 1],
            easing: 'easeOutExpo',
            duration: 1200
        });

        window.scrollTo(0, 0);
    }, []);

    const uiProjects = [
        {
            id: 1,
            title: "FinTech Dashboard",
            category: "Web Application",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
            description: "A comprehensive financial management dashboard with real-time data visualization.",
            tags: ["React", "D3.js", "Glassmorphism"]
        },
        {
            id: 2,
            title: "Crypto Wallet App",
            category: "Mobile UI",
            image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=800&q=80",
            description: "Modern crypto wallet interface focusing on ease of use and dark mode aesthetics.",
            tags: ["Figma", "UI Design", "Crypto"]
        },
        {
            id: 3,
            title: "AI Image Generator",
            category: "SaaS Platform",
            image: "https://images.unsplash.com/photo-1675271591211-126ad94e495d?auto=format&fit=crop&w=800&q=80",
            description: "Futuristic interface for an AI-powered image generation tool.",
            tags: ["Next.js", "AI", "Futuristic"]
        },
        {
            id: 4,
            title: "E-commerce Redesign",
            category: "E-commerce",
            image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80",
            description: "Premium shopping experience with smooth transitions and minimal layout.",
            tags: ["UX Research", "UI Design", "Tailwind"]
        },
        {
            id: 5,
            title: "Health Tracker",
            category: "Mobile App",
            image: "https://images.unsplash.com/photo-1554260570-9140fd3b7614?auto=format&fit=crop&w=800&q=80",
            description: "Personal health tracking app with interactive charts and sleep analysis.",
            tags: ["Mobile", "Health", "Analytics"]
        },
        {
            id: 6,
            title: "Creative Agency Portfolio",
            category: "Portfolio",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
            description: "Bold and interactive portfolio for a modern design agency.",
            tags: ["GSAP", "Three.js", "Creative"]
        }
    ];

    return (
        <div className="portfolio-page">
            <div className="container">
                <header className="page-header">
                    <h1 className="text-neon">UI Design Portfolio</h1>
                    <p className="subtitle">Explorations in modern interfaces, interaction design, and visual storytelling.</p>
                </header>

                <div className="portfolio-grid">
                    {uiProjects.map((project) => (
                        <div key={project.id} className="portfolio-card glass">
                            <div className="card-image">
                                <img src={project.image} alt={project.title} />
                                <div className="card-overlay">
                                    <div className="overlay-btns">
                                        <button className="icon-btn"><Eye size={20} /></button>
                                        <button className="icon-btn"><ExternalLink size={20} /></button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-content">
                                <span className="category">{project.category}</span>
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <div className="tags">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UIPortfolio;
