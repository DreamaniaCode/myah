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
                <Link href="/admin/products/add" className={`${styles.btn} ${styles.primary}`}>
                    ➕ إضافة منتج جديد
                </Link>
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
