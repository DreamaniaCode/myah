import { getProducts, createProduct, deleteProduct } from '@/app/actions';

export const dynamic = 'force-dynamic';

import Link from 'next/link';
import styles from '../styles.module.css';

export default async function AdminProductsPage() {
    const products = await getProducts();

    return (
        <div dir="rtl">
            <div className={styles.header}>
                <h1 className={styles.title}>إدارة المنتجات</h1>
            </div>

            <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'white', borderRadius: '8px' }}>
                <h3 style={{ marginBottom: '1rem' }}>➕ إضافة منتج جديد</h3>
                <form action={createProduct} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <input name="name" placeholder="اسم المنتج" required style={{ padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px' }} />
                    <input name="price" type="number" step="0.01" placeholder="السعر" required style={{ padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px' }} />
                    <input name="category" placeholder="الفئة (honey, herbs, oils)" required style={{ padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px' }} />
                    <input name="image" placeholder="رابط الصورة (URL) أو مسار الملف (مثلاً: /images/file.png)" required style={{ padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px' }} />
                    <textarea name="description" placeholder="الوصف" required style={{ padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px', gridColumn: 'span 2' }} />
                    <label style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input type="checkbox" name="isNew" />
                        <span>منتج جديد</span>
                    </label>
                    <button type="submit" className={`${styles.btn} ${styles.primary}`} style={{ gridColumn: 'span 2' }}>إضافة المنتج</button>
                </form>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>الاسم</th>
                            <th>السعر</th>
                            <th>الفئة</th>
                            <th>الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.price} درهم</td>
                                <td>{product.category}</td>
                                <td style={{ display: 'flex', gap: '0.5rem' }}>
                                    <Link href={`/admin/products/edit/${product.id}`} className={`${styles.btn} ${styles.primary}`}>
                                        تعديل
                                    </Link>
                                    <form action={deleteProduct.bind(null, product.id)} style={{ display: 'inline' }}>
                                        <button className={`${styles.btn} ${styles.danger}`}>حذف</button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
