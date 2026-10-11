import type { ElementType, ReactNode } from 'react';

interface RisoTitleProps {
    as?: ElementType;
    className?: string;
    children: ReactNode;
}

// Prints the text twice: the blue key plate, then a pink plate that landed slightly off-register.
export default function RisoTitle({ as: Tag = 'h1', className = '', children }: RisoTitleProps) {
    return (
        <Tag className={`riso-title ${className}`}>
            {children}
            <span aria-hidden="true" className="riso-title__plate">
                {children}
            </span>
        </Tag>
    );
}
