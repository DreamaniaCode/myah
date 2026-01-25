import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sanity Studio',
    robots: { index: false, follow: false },
    referrer: 'origin-when-cross-origin',
};
import type { Viewport } from 'next';

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
