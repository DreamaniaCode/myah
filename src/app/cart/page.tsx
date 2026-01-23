import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartPageClient from './CartPageClient';
import { getSettings } from '@/app/actions/settings';

export const dynamic = 'force-dynamic';


export default async function CartPage() {
    const settingsPromise = getSettings();
    const settings = await settingsPromise;

    return (
        <main style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header settingsPromise={settingsPromise} />
            <CartPageClient />
            <Footer
                siteName={settings.siteName}
                contactPhone={settings.contactPhone}
                contactEmail={settings.contactEmail}
                contactAddress={settings.contactAddress}
            />
        </main>
    );
}
