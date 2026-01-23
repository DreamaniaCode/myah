import CheckoutPage from './CheckoutPage';
import { getSettings } from '@/app/actions/settings';

export default async function CheckoutWrapper() {
    const settings = await getSettings();
    return <CheckoutPage settings={settings} />;
}
