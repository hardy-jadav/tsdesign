import React, { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import './HeroTextAnimation.css';

/**
 * HeroTextAnimation - GSAP-powered SVG text animation
 * Inspired by the "COLOUR" SVG morph animation with sliding segments,
 * color cycling, and glow effects.
 *
 * Each letter is built from rectangular SVG segments that slide vertically,
 * stretch (morph feel), and cycle through neon colors with a glow filter.
 */

// ──────────────────────────────────────────────
// Letter segment definitions
// Each letter fits in a 60×90 unit-cell.
// Segments: { x, y, w, h }
// ──────────────────────────────────────────────
const LETTER_DEFS = {
    H: [
        { x: 0, y: 0, w: 12, h: 90 },    // left pillar
        { x: 48, y: 0, w: 12, h: 90 },    // right pillar
        { x: 12, y: 39, w: 36, h: 12 },   // crossbar
    ],
    A: [
        { x: 0, y: 12, w: 12, h: 78 },    // left leg
        { x: 48, y: 12, w: 12, h: 78 },   // right leg
        { x: 12, y: 0, w: 36, h: 12 },    // cap
        { x: 12, y: 45, w: 36, h: 12 },   // crossbar
    ],
    R: [
        { x: 0, y: 0, w: 12, h: 90 },     // spine
        { x: 12, y: 0, w: 36, h: 12 },    // top bar
        { x: 48, y: 12, w: 12, h: 28 },   // bump right
        { x: 12, y: 40, w: 36, h: 12 },   // mid bar
        { x: 48, y: 55, w: 12, h: 35 },   // right leg (kick)
    ],
    D: [
        { x: 0, y: 0, w: 12, h: 90 },     // spine
        { x: 12, y: 0, w: 30, h: 12 },    // top bar
        { x: 12, y: 78, w: 30, h: 12 },   // bottom bar
        { x: 42, y: 12, w: 12, h: 66 },   // right curve
    ],
    Y: [
        { x: 0, y: 0, w: 12, h: 45 },     // left arm
        { x: 48, y: 0, w: 12, h: 45 },    // right arm
        { x: 12, y: 33, w: 36, h: 12 },   // junction
        { x: 24, y: 45, w: 12, h: 45 },   // stem
    ],
    I: [
        { x: 12, y: 0, w: 36, h: 12 },    // top bar
        { x: 24, y: 12, w: 12, h: 66 },   // pillar
        { x: 12, y: 78, w: 36, h: 12 },   // bottom bar
    ],
    S: [
        { x: 12, y: 0, w: 48, h: 12 },    // top bar
        { x: 0, y: 12, w: 12, h: 28 },    // upper left
        { x: 12, y: 40, w: 36, h: 12 },   // mid bar
        { x: 48, y: 52, w: 12, h: 26 },   // lower right
        { x: 0, y: 78, w: 48, h: 12 },    // bottom bar
    ],
    J: [
        { x: 12, y: 0, w: 48, h: 12 },    // top bar
        { x: 42, y: 12, w: 12, h: 60 },   // right pillar
        { x: 0, y: 60, w: 12, h: 18 },    // hook left
        { x: 12, y: 78, w: 30, h: 12 },   // hook bottom
    ],
    V: [
        { x: 0, y: 0, w: 12, h: 60 },     // left side
        { x: 48, y: 0, w: 12, h: 60 },    // right side
        { x: 12, y: 54, w: 12, h: 24 },   // left taper
        { x: 36, y: 54, w: 12, h: 24 },   // right taper
        { x: 24, y: 72, w: 12, h: 18 },   // bottom tip
    ],
};

const WORD1 = 'HARDISH';
const WORD2 = 'JADAV';
const LETTER_WIDTH = 60;
const LETTER_GAP = 14;
const WORD_GAP = 36;

// Vibrant neon palette for color cycling
const colorArray = [
    '#fbe46c', '#fe987b', '#d569fa', '#5f88ea',
    '#63cdeb', '#afff8a', '#00e5ff', '#9d00ff',
];

const HeroTextAnimation = () => {
    const svgRef = useRef(null);
    const containerRef = useRef(null);
    const timelinesRef = useRef([]);

    // Calculate layout
    const word1Width = WORD1.length * LETTER_WIDTH + (WORD1.length - 1) * LETTER_GAP;
    const word2Width = WORD2.length * LETTER_WIDTH + (WORD2.length - 1) * LETTER_GAP;
    const totalWidth = word1Width + WORD_GAP + word2Width;
    const totalHeight = 90;

    // Build all segments with letter & position metadata
    const segments = useMemo(() => {
        const segs = [];
        let offsetX = 0;

        const addWord = (word, letterOffset) => {
            for (let i = 0; i < word.length; i++) {
                const defs = LETTER_DEFS[word[i]];
                if (defs) {
                    defs.forEach((seg, j) => {
                        segs.push({
                            ...seg,
                            x: seg.x + offsetX,
                            letterIndex: letterOffset + i,
                            segIndex: j,
                            id: `seg-${letterOffset + i}-${j}`,
                        });
                    });
                }
                offsetX += LETTER_WIDTH + LETTER_GAP;
            }
        };

        addWord(WORD1, 0);
        offsetX = word1Width + WORD_GAP;
        addWord(WORD2, WORD1.length);

        return segs;
    }, []);

    useEffect(() => {
        if (!svgRef.current) return;

        const rects = Array.from(svgRef.current.querySelectorAll('.anim-seg'));
        if (!rects.length) return;

        // ── Initial state ──────────────────────
        gsap.set(rects, {
            opacity: 0,
            y: (i) => (i % 2 === 0 ? -40 : 40),
            transformOrigin: 'center center',
        });
        gsap.set(svgRef.current, { visibility: 'visible' });

        // ────────────────────────────────────────
        // 1. ENTRANCE  — segments slide in
        // ────────────────────────────────────────
        const entranceTl = gsap.timeline();

        entranceTl.to(rects, {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: { each: 0.035, from: 'start' },
            ease: 'back.out(1.4)',
        });

        // ────────────────────────────────────────
        // 2. COLUMN SHUFFLE  — like the COLOUR ref
        //    Segments slide up/down per-letter
        // ────────────────────────────────────────
        const shuffleTl = gsap.timeline();

        // Group rects by letter
        const letterGroups = {};
        rects.forEach((r, i) => {
            const lIdx = segments[i].letterIndex;
            if (!letterGroups[lIdx]) letterGroups[lIdx] = [];
            letterGroups[lIdx].push({ el: r, seg: segments[i], i });
        });

        const letterKeys = Object.keys(letterGroups).sort((a, b) => a - b);
        letterKeys.forEach((key, li) => {
            const group = letterGroups[key];
            const offset = li * 0.12;

            // Phase A: slide odd-indexed segs down, even up
            group.forEach(({ el, seg }, si) => {
                const dir = si % 2 === 0 ? 1 : -1;
                shuffleTl.to(el, {
                    y: dir * 20,
                    duration: 0.45,
                    ease: 'power2.inOut',
                }, offset + si * 0.04);
            });

            // Phase B: snap back
            group.forEach(({ el }, si) => {
                shuffleTl.to(el, {
                    y: 0,
                    duration: 0.55,
                    ease: 'elastic.out(1, 0.5)',
                }, offset + 0.4 + si * 0.04);
            });
        });

        entranceTl.add(shuffleTl, 0.9);

        // ────────────────────────────────────────
        // 3. STRETCH MORPH  — vertical segments
        //    grow taller then spring back
        // ────────────────────────────────────────
        const stretchTl = gsap.timeline();

        rects.forEach((rect, i) => {
            const s = segments[i];
            if (s.h > s.w) {
                stretchTl.to(rect, {
                    scaleY: 1.25,
                    duration: 0.3,
                    ease: 'power2.inOut',
                }, i * 0.018);
                stretchTl.to(rect, {
                    scaleY: 1,
                    duration: 0.45,
                    ease: 'elastic.out(1, 0.55)',
                }, 0.28 + i * 0.018);
            }
        });

        entranceTl.add(stretchTl, 1.5);

        // ────────────────────────────────────────
        // 4. COLOR CYCLING  — rainbow wave
        // ────────────────────────────────────────
        const colorInterp = gsap.utils.interpolate(colorArray);
        const colorTl = gsap.timeline({ repeat: -1 });

        rects.forEach((rect, i) => {
            colorTl.to(rect, {
                fill: '#fff',
                duration: colorArray.length * 0.35,
                modifiers: {
                    fill() { return colorInterp(this.ratio); },
                },
                repeat: -1,
                ease: 'sine.inOut',
            }, i * 0.06);
        });

        // Matching glow color
        const flood = svgRef.current.querySelector('#heroGlowAlpha');
        if (flood) {
            colorTl.to(flood, {
                attr: { 'flood-color': '#fff' },
                duration: colorArray.length * 0.35,
                modifiers: {
                    attr() { return { 'flood-color': colorInterp(this.ratio) }; },
                },
                repeat: -1,
                ease: 'sine.inOut',
            }, 0);
        }

        colorTl.seek(50);

        // ────────────────────────────────────────
        // 5. IDLE LOOP  — repeating wave shuffle
        // ────────────────────────────────────────
        const idleTl = gsap.timeline({
            repeat: -1,
            repeatDelay: 2.5,
            delay: 3.5,
        });

        rects.forEach((rect, i) => {
            const dir = i % 3 === 0 ? -1 : i % 3 === 1 ? 1 : -0.5;
            idleTl.to(rect, {
                y: dir * (6 + Math.random() * 10),
                scaleY: 1 + Math.random() * 0.15,
                duration: 0.45,
                ease: 'power2.inOut',
            }, i * 0.02);
            idleTl.to(rect, {
                y: 0,
                scaleY: 1,
                duration: 0.7,
                ease: 'elastic.out(1, 0.45)',
            }, 0.45 + i * 0.02);
        });

        timelinesRef.current = [entranceTl, colorTl, idleTl];

        return () => {
            timelinesRef.current.forEach((tl) => tl.kill());
        };
    }, [segments]);

    // ViewBox with breathing room
    const pad = 25;
    const vb = `${-pad} ${-pad} ${totalWidth + pad * 2} ${totalHeight + pad * 2}`;

    return (
        <div className="hero-text-anim-container" ref={containerRef}>
            <svg
                ref={svgRef}
                className="hero-text-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox={vb}
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    <filter id="heroGlow" x="-100%" y="-100%" width="350%" height="350%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feOffset dx="0" dy="0" result="offsetblur" />
                        <feFlood id="heroGlowAlpha" floodColor="#00e5ff" floodOpacity="0.5" />
                        <feComposite in2="offsetblur" operator="in" />
                        <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <g filter="url(#heroGlow)">
                    {segments.map((seg) => (
                        <rect
                            key={seg.id}
                            className="anim-seg"
                            x={seg.x}
                            y={seg.y}
                            width={seg.w}
                            height={seg.h}
                            rx={2}
                            ry={2}
                            fill="#00e5ff"
                            data-letter={seg.letterIndex}
                            data-seg={seg.segIndex}
                        />
                    ))}
                </g>
            </svg>
        </div>
    );
};

export default HeroTextAnimation;
