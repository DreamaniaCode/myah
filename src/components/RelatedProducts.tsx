import { getProducts } from '@/app/actions';
import ProductList from './ProductList';
import Link from 'next/link';

interface RelatedProductsProps {
    currentProductId: string;
    category?: string;
}

export default async function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
    // In a real app, we would filter by category in the database query
    const allProducts = await getProducts();

    // Filter out current product and verify category if possible, or just take random/latest
    const related = allProducts
        .filter(p => p.id !== currentProductId)
        .slice(0, 4); // Take up to 4 related products

    if (related.length === 0) return null;

    // Convert Prisma products to the view model used by ProductCard
    const viewProducts = related.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: p.price,
        image: p.image,
        category: p.category as any,
        isNew: p.isNew
    }));

    return (
        <section style={{ marginTop: '5rem', borderTop: '1px solid #E5E7EB', paddingTop: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>قد يعجبك أيضاً</h2>
                <Link href="/products" style={{ color: '#059669', fontWeight: 600 }}>مشاهدة الكل &larr;</Link>
            </div>

            <ProductList products={viewProducts} />
        </section>
    );
}
