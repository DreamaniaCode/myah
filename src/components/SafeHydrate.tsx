'use client';

import { useEffect, useState, ReactNode } from 'react';

interface SafeHydrateProps {
    children: ReactNode;
    fallback?: ReactNode;
}

/**
 * A utility component that prevents hydration mismatches by ensuring
 * that the children are only rendered on the client after mounting.
 * Useful for content that depends on client-only APIs (e.g., Dates with locale, window size).
 */
export default function SafeHydrate({ children, fallback = null }: SafeHydrateProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}
