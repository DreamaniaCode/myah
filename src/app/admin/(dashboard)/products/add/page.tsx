import { createProduct } from '@/app/actions';
import ProductForm from '@/components/admin/ProductForm';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function AddProductPage() {
    return (
        <div dir="rtl">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>إضافة منتج جديد</h1>
                <Link
                    href="/admin/products"
                    style={{ padding: '0.5rem 1rem', background: '#E5E7EB', borderRadius: '6px', fontSize: '0.9rem', color: '#374151' }}
                >
                    &larr; رجوع
                </Link>
            </div>

            <ProductForm
                action={createProduct}
                submitLabel="نشر المنتج"
            />
        </div>
    );
}
