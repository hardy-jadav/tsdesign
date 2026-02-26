import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <p>© {new Date().getFullYear()} <span className="text-neon">Hardy Jadav</span>. All rights reserved.</p>
                <div className="footer-links">
                    <a href="#" className="interactive">Privacy Policy</a>
                    <a href="#" className="interactive">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
