import { getProduct, getProducts } from '@/app/actions';
import { getSettings } from '@/app/actions/settings';
import { redirect } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';

export const dynamic = 'force-dynamic';


export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProduct(id);
    const settingsPromise = getSettings();
    const settings = await settingsPromise;

    if (!product) {
        redirect('/');
    }

    // Get related products (same category)
    const allProducts = await getProducts();
    const relatedProducts = allProducts
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 3)
        .map(p => ({
            id: p.id,
            name: p.name,
            description: p.description,
            price: p.price,
            image: p.image,
            category: p.category as any,
            isNew: p.isNew
        }));

    const serializedProduct = {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category as any,
        isNew: product.isNew
    };

    return (
        <ProductDetailClient
            product={serializedProduct}
            relatedProducts={relatedProducts}
            whatsappNumber={settings.contactPhone}
            settingsPromise={Promise.resolve(settings)}
            settings={{
                siteName: settings.siteName,
                contactPhone: settings.contactPhone,
                contactEmail: settings.contactEmail,
                contactAddress: settings.contactAddress
            }}
        />
    );
}
