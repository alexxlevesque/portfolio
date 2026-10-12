'use client';

import { useState, type MouseEvent, type ReactNode } from 'react';
import ResumeDesk, { RESUME_PDF } from './ResumeDesk';

// Opens the resume on the desk. Still a plain link to the PDF for new tabs, middle clicks and no JavaScript.
export default function ResumeLink({ className, children }: { className?: string; children: ReactNode }) {
    const [open, setOpen] = useState(false);

    const onClick = (e: MouseEvent) => {
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        setOpen(true);
    };

    return (
        <>
            <a href={RESUME_PDF} onClick={onClick} aria-haspopup="dialog" className={className}>
                {children}
            </a>
            {open && <ResumeDesk onClose={() => setOpen(false)} />}
        </>
    );
}
