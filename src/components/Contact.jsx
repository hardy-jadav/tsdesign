import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail, Github, Linkedin, Twitter } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const [focused, setFocused] = useState(null);

    const socialLinks = [
        { icon: <Github size={24} />, href: 'https://github.com' },
        { icon: <Linkedin size={24} />, href: 'https://linkedin.com/in/hardish-jadav' },
        { icon: <Twitter size={24} />, href: '#' },
    ];

    return (
        <section id="contact" className="contact">
            <div className="container">
                <h2 className="section-title">Get In <span className="text-neon">Touch</span></h2>

                <div className="contact-grid">
                    <div className="contact-info">
                        <p className="contact-text">
                            Have a project in mind or just want to say hi? My inbox is always open.
                            I'm currently looking for new opportunities and collaborations.
                        </p>

                        <div className="info-items">
                            <div className="info-item">
                                <div className="info-icon glass text-neon"><Mail size={20} /></div>
                                <div>
                                    <p className="info-label">Email</p>
                                    <p className="info-value">hardishjadav@gmail.com</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <div className="info-icon glass text-neon"><Phone size={20} /></div>
                                <div>
                                    <p className="info-label">Phone</p>
                                    <p className="info-value">+91 75676 15715</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <div className="info-icon glass text-neon"><MapPin size={20} /></div>
                                <div>
                                    <p className="info-label">Location</p>
                                    <p className="info-value">Gandhinagar, Gujarat</p>
                                </div>
                            </div>
                        </div>

                        <div className="social-box">
                            <p>Follow Me</p>
                            <div className="social-icons">
                                {socialLinks.map((link, i) => (
                                    <a key={i} href={link.href} className="social-btn glass interactive">
                                        {link.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <form className="contact-form glass" onSubmit={(e) => e.preventDefault()}>
                        <div className={`form-group ${focused === 'name' ? 'focused' : ''}`}>
                            <label>Name</label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                onFocus={() => setFocused('name')}
                                onBlur={() => setFocused(null)}
                            />
                            <div className="input-glow"></div>
                        </div>

                        <div className={`form-group ${focused === 'email' ? 'focused' : ''}`}>
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="your@email.com"
                                onFocus={() => setFocused('email')}
                                onBlur={() => setFocused(null)}
                            />
                            <div className="input-glow"></div>
                        </div>

                        <div className={`form-group ${focused === 'message' ? 'focused' : ''}`}>
                            <label>Message</label>
                            <textarea
                                rows="5"
                                placeholder="Talk to me..."
                                onFocus={() => setFocused('message')}
                                onBlur={() => setFocused(null)}
                            ></textarea>
                            <div className="input-glow"></div>
                        </div>

                        <button type="submit" className="submit-btn interactive">
                            Send Message <Send size={20} />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
