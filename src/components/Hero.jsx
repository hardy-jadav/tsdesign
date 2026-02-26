import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { ArrowRight, ChevronDown } from 'lucide-react';
import HeroTextAnimation from './HeroTextAnimation';
import './Hero.css';

const Hero = () => {
    const contentRef = useRef(null);

    useEffect(() => {
        const tl = anime.timeline({
            easing: 'easeOutExpo',
            duration: 1200,
        });

        tl.add({
            targets: '.hero-title',
            translateY: [20, 0],
            opacity: [0, 1],
            delay: 800,
        })
            .add({
                targets: '.hero-tagline',
                translateY: [20, 0],
                opacity: [0, 1],
            }, '-=800')
            .add({
                targets: '.hero-ctas',
                translateY: [20, 0],
                opacity: [0, 1],
            }, '-=800');
    }, []);

    return (
        <section className="hero" id="home">
            <div className="container hero-content" ref={contentRef}>
                <div className="hero-text-wrapper">
                    <h2 className="hero-greeting text-neon">Hello, I'm</h2>

                    {/* Animated SVG text replaces the static h1 */}
                    <HeroTextAnimation />

                    <h3 className="hero-title">Frontend Developer | UI Developer</h3>
                    <p className="hero-tagline">
                        Frontend Developer with 2.5 years of professional experience in building
                        scalable, high-performance and user-centric web applications.
                    </p>

                    <div className="hero-ctas">
                        <a href="#projects" className="btn btn-primary">
                            View Projects <ArrowRight size={18} />
                        </a>
                        <a href="#contact" className="btn btn-outline">
                            Contact Me
                        </a>
                    </div>
                </div>
            </div>

            <div className="scroll-indicator">
                <ChevronDown size={30} className="float" />
            </div>

            {/* Decorative blobs */}
            <div className="hero-blob blob-1"></div>
            <div className="hero-blob blob-2"></div>
        </section>
    );
};

export default Hero;
