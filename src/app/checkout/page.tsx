import CheckoutPage from './CheckoutPage';
import { getSettings } from '@/app/actions/settings';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default async function CheckoutWrapper() {
    const settings = await getSettings();
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header settingsPromise={getSettings()} />
            <main className="container section-padding" style={{ flex: 1 }}>
                <CheckoutPage settings={settings} />
            </main>
            <Footer
                siteName={settings.siteName}
                contactPhone={settings.contactPhone}
                contactEmail={settings.contactEmail}
                contactAddress={settings.contactAddress}
            />
        </div>
    );
}
