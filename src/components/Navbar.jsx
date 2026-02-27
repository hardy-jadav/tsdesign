import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About', href: '/#about', type: 'hash' },
        { name: 'Skills', href: '/#skills', type: 'hash' },
        { name: 'Projects', href: '/#projects', type: 'hash' },
        { name: 'Portfolio', href: '/portfolio', type: 'route' },
        { name: 'Experience', href: '/#experience', type: 'hash' },
        { name: 'Contact', href: '/#contact', type: 'hash' },
    ];

    const isActive = (path) => {
        if (path === '/portfolio') {
            return location.pathname === '/portfolio';
        }
        return false;
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled glass' : ''}`}>
            <div className="container nav-content">
                <NavLink to="/" className="logo">
                    <span className="text-neon">H</span>J.
                </NavLink>

                <div className="desktop-links">
                    {navLinks.map((link) => (
                        link.type === 'route' ? (
                            <NavLink
                                key={link.name}
                                to={link.href}
                                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                            >
                                {link.name}
                            </NavLink>
                        ) : (
                            <a
                                key={link.name}
                                href={link.href}
                                className="nav-item"
                            >
                                {link.name}
                            </a>
                        )
                    ))}
                </div>

                <div className="social-links">
                    <a href="https://github.com" target="_blank" rel="noreferrer"><Github size={20} /></a>
                    <a href="https://linkedin.com/in/hardish-jadav" target="_blank" rel="noreferrer"><Linkedin size={20} /></a>
                    <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu glass ${isOpen ? 'open' : ''}`}>
                {navLinks.map((link) => (
                    link.type === 'route' ? (
                        <NavLink
                            key={link.name}
                            to={link.href}
                            className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </NavLink>
                    ) : (
                        <a
                            key={link.name}
                            href={link.href}
                            className="mobile-nav-item"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </a>
                    )
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
