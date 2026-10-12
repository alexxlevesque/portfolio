'use client';

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import ResumeSheet, { SHEET_HEIGHT, SHEET_WIDTH } from './ResumeSheet';
import { Paperclip, Pen, Pencil } from './DeskProps';

export const RESUME_PDF = '/documents/resume.pdf';

const GUTTER = 28; // clear space around the sheet
const PROPS_WIDTH = 190; // room beside the sheet for the pencil and pen, on wide screens
const LEAVE_MS = 220; // matches .desk-leaving

// Copies left on the desk under the top sheet, each a little askew.
const underSheets = [
    { fan: 'translate(-9px, 7px) rotate(-1.6deg)', sheet: 'rgb(242 236 220)' },
    { fan: 'translate(8px, 4px) rotate(1.1deg)', sheet: 'rgb(246 241 228)' },
];

const vignette = (mask: string): CSSProperties => ({ maskImage: mask, WebkitMaskImage: mask });

// The page goes soft toward the edges, as if the sheet were being held up close.
const backdrop: { blur: string; style: CSSProperties }[] = [
    { blur: 'backdrop-blur-[2px]', style: { background: 'rgb(var(--paper) / 0.25)' } },
    { blur: 'backdrop-blur-[7px]', style: vignette('radial-gradient(62% 72%, transparent 28%, black 78%)') },
    { blur: 'backdrop-blur-[16px]', style: vignette('radial-gradient(70% 80%, transparent 52%, black 100%)') },
    {
        blur: '',
        style: {
            background:
                'radial-gradient(ellipse 75% 85% at 50% 50%, rgb(var(--paper) / 0.08), rgb(var(--paper) / 0.45) 70%, rgb(var(--paper) / 0.7))',
        },
    },
];

// The resume, laid on the desk: it arrives folded, opens toward you, and the rest of the stack settles under it.
export default function ResumeDesk({ onClose }: { onClose: () => void }) {
    const dialogRef = useRef<HTMLDivElement>(null);
    const reducedMotion = useRef(false);
    const [scale, setScale] = useState(0);
    const [wide, setWide] = useState(false);
    const [opened, setOpened] = useState(false); // the flap has unfolded
    const [leaving, setLeaving] = useState(false);

    useLayoutEffect(() => {
        reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reducedMotion.current) setOpened(true);

        const fit = () => {
            const isWide = window.innerWidth >= 1024;
            setWide(isWide);
            setScale(Math.min(
                (window.innerHeight - GUTTER * 2) / SHEET_HEIGHT,
                (window.innerWidth - GUTTER * 2 - (isWide ? PROPS_WIDTH : 0)) / SHEET_WIDTH,
                1,
            ));
        };
        fit();
        window.addEventListener('resize', fit);
        return () => window.removeEventListener('resize', fit);
    }, []);

    // Hold the page still underneath, and hand focus back to the link afterwards.
    useEffect(() => {
        const previous = document.activeElement as HTMLElement | null;
        const { overflow } = document.body.style;
        document.body.style.overflow = 'hidden';
        dialogRef.current?.focus();
        return () => {
            document.body.style.overflow = overflow;
            previous?.focus();
        };
    }, []);

    const close = () => {
        if (leaving) return;
        setLeaving(true);
        window.setTimeout(onClose, reducedMotion.current ? 0 : LEAVE_MS);
    };

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') close();
        if (e.key !== 'Tab' || !dialogRef.current) return;

        // Keep Tab cycling through the dialog's own links
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>('a[href], button');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || active === dialogRef.current)) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && active === last) {
            e.preventDefault();
            first.focus();
        }
    };

    const width = SHEET_WIDTH * scale;
    const height = SHEET_HEIGHT * scale;

    return createPortal(
        <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Resume"
            tabIndex={-1}
            onKeyDown={onKeyDown}
            className={`desk fixed inset-0 z-[200] outline-none ${leaving ? 'desk-leaving' : ''}`}
        >
            {backdrop.map(({ blur, style }, i) => (
                <div key={i} aria-hidden="true" className={`desk-layer absolute inset-0 ${blur}`} style={style} />
            ))}

            <div
                className="absolute inset-0 flex items-center justify-center"
                onClick={(e) => e.target === e.currentTarget && close()}
            >
                {scale > 0 && (
                    <div className="desk-sheet relative" style={{ width, height, marginRight: wide ? PROPS_WIDTH : 0 }}>
                        <div className="absolute left-0 top-0 origin-top-left" style={{ width: SHEET_WIDTH, height: SHEET_HEIGHT, transform: `scale(${scale})` }}>
                            {underSheets.map(({ fan, sheet }) => (
                                <div
                                    key={fan}
                                    aria-hidden="true"
                                    className="desk-under sheet-paper sheet-shadow absolute inset-0"
                                    style={{ '--fan': fan, '--sheet': sheet } as CSSProperties}
                                />
                            ))}

                            {/* The top sheet, cut off at the fold until the lower half has swung down */}
                            <div
                                className="sheet-paper sheet-shadow absolute inset-0"
                                style={opened ? undefined : { clipPath: 'inset(-100px -100px 50% -100px)' }}
                            >
                                <ResumeSheet />
                            </div>

                            {!opened && (
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-x-0 bottom-0 h-1/2"
                                    style={{ perspective: 2600, perspectiveOrigin: '50% 0%' }}
                                >
                                    <div
                                        className="desk-flap absolute inset-0 origin-top [transform-style:preserve-3d]"
                                        onAnimationEnd={(e) => e.target === e.currentTarget && setOpened(true)}
                                    >
                                        {/* Face: the lower half of the page */}
                                        <div className="sheet-shadow absolute inset-0 overflow-hidden [backface-visibility:hidden]">
                                            <div className="sheet-paper absolute inset-x-0 bottom-0" style={{ height: SHEET_HEIGHT }}>
                                                <ResumeSheet />
                                            </div>
                                            <div className="desk-flap-shade absolute inset-0 bg-ink/20" />
                                        </div>
                                        {/* Back: blank stock, seen while the sheet is still folded */}
                                        <div className="absolute inset-0 overflow-hidden [backface-visibility:hidden] [transform:rotateX(180deg)]">
                                            <div className="sheet-paper sheet-shadow absolute inset-x-0 top-0" style={{ height: SHEET_HEIGHT }} />
                                            <div className="desk-flap-back-shade absolute inset-0 bg-ink/10" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <a
                            href={RESUME_PDF}
                            download="Alex-Levesque-Resume.pdf"
                            className="desk-note group/note absolute -right-7 -top-4 z-10 block outline-none sm:-right-9 sm:top-3"
                        >
                            <span className="relative block origin-[70%_0%] rotate-[2deg] transition-transform duration-500 ease-out group-hover/note:-translate-y-0.5 group-hover/note:rotate-0 group-focus-visible/note:-translate-y-0.5 group-focus-visible/note:rotate-0">
                                <span className="note-paper flex h-[70px] w-[74px] items-center justify-center text-center text-[15px] italic leading-[1.1] sm:h-[88px] sm:w-[92px] sm:text-[17px]">
                                    <span className="decoration-ink-rose decoration-1 underline-offset-2 group-hover/note:underline group-focus-visible/note:underline">
                                        take a<br />copy
                                    </span>
                                </span>
                                <Paperclip className="absolute -top-3 right-1.5 rotate-[9deg] drop-shadow-[0.6px_1.2px_0.7px_rgb(38_33_30_/_0.28)]" />
                            </span>
                        </a>

                        {wide && (
                            <div aria-hidden="true" className="pointer-events-none absolute top-0 h-full" style={{ left: width + 40, width: PROPS_WIDTH }}>
                                <DeskProp rest={11} nudged={7} delay="1.35s" style={{ left: 18, top: '28%' }}>
                                    <Pencil height={height * 0.44} />
                                </DeskProp>
                                <DeskProp rest={-7} nudged={-3} delay="1.5s" style={{ left: 96, top: '36%' }}>
                                    <Pen height={height * 0.4} />
                                </DeskProp>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <button type="button" onClick={close} className="desk-layer plate-link absolute right-5 top-5 z-10 sm:right-8 sm:top-6">
                Close ✕
            </button>
        </div>,
        document.body,
    );
}

interface DeskPropProps {
    rest: number; // degrees, lying on the desk
    nudged: number; // degrees, when the cursor brushes it
    delay: string;
    style: CSSProperties;
    children: ReactNode;
}

function DeskProp({ rest, nudged, delay, style, children }: DeskPropProps) {
    return (
        <div className="desk-prop absolute" style={{ ...style, '--delay': delay } as CSSProperties}>
            <div
                className="pointer-events-auto drop-shadow-[4px_10px_8px_rgb(38_33_30_/_0.22)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform:rotate(var(--rest))] hover:[transform:rotate(var(--nudged))]"
                style={{ '--rest': `${rest}deg`, '--nudged': `${nudged}deg` } as CSSProperties}
            >
                {children}
            </div>
        </div>
    );
}
