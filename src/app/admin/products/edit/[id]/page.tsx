import { getProduct } from '@/app/actions';
export const dynamic = 'force-dynamic';

import { redirect } from 'next/navigation';
import EditProductForm from './EditProductForm';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        redirect('/admin/products');
    }

    return <EditProductForm product={product} />;
}
