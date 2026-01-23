import { getProducts } from '@/app/actions';
import { getSettings } from '@/app/actions/settings';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductList from '@/components/ProductList';

export const dynamic = 'force-dynamic';


export default async function ProductsPage() {
    const prismaProducts = await getProducts();
    const settingsPromise = getSettings();
    const settings = await settingsPromise;

    const products = prismaProducts.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        image: p.image,
        category: p.category as any,
        isNew: p.isNew
    }));

    return (
        <>
            <Header settingsPromise={settingsPromise} />

            <main style={{ minHeight: '100vh', padding: '4rem 0', background: 'linear-gradient(to bottom, #FFFBEB 0%, #ffffff 100%)' }}>
                <div className="container">
                    <h1 style={{ fontSize: '3rem', fontWeight: 800, textAlign: 'center', marginBottom: '3rem', color: 'var(--text-color)' }}>
                        جميع المنتجات
                    </h1>
                    <ProductList products={products} />
                </div>
            </main>

            <Footer
                siteName={settings.siteName}
                contactPhone={settings.contactPhone}
                contactEmail={settings.contactEmail}
                contactAddress={settings.contactAddress}
            />
        </>
    );
}
