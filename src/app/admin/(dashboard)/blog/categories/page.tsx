export const dynamic = 'force-dynamic';
import { createBlogCategory, deleteBlogCategory, getBlogCategories } from '@/app/actions';
import Link from 'next/link';
import styles from '../../styles.module.css';

export default async function AdminBlogCategoriesPage() {
    const categories = await getBlogCategories();

    return (
        <div dir="rtl">
            <div className={styles.header}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link href="/admin/blog" className={styles.btn} style={{ background: '#E5E7EB', color: '#374151' }}>
                        &larr; رجوع
                    </Link>
                    <h1 className={styles.title} style={{ marginBottom: 0 }}>إدارة تصنيفات المدونة</h1>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                {/* Form to Add New Category */}
                <div className={styles.card}>
                    <h3 className={styles.cardTitle}>إضافة تصنيف جديد</h3>
                    <form action={createBlogCategory} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label>الاسم (إنجليزي)</label>
                            <input name="name" required placeholder="Health" className={styles.input} />
                        </div>
                        <div>
                            <label>الاسم (عربي)</label>
                            <input name="nameAr" required placeholder="الصحة" className={styles.input} />
                        </div>
                        <div>
                            <label>الرابط (Slug)</label>
                            <input name="slug" required placeholder="health" className={styles.input} dir="ltr" />
                        </div>
                        <button type="submit" className={`${styles.btn} ${styles.primary}`}>
                            حفظ التصنيف
                        </button>
                    </form>
                </div>

                {/* Table to List Categories */}
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>الاسم (عربي)</th>
                                <th>الاسم (إنجليزي)</th>
                                <th>الرابط (Slug)</th>
                                <th>الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((cat) => (
                                <tr key={cat.id}>
                                    <td>{cat.nameAr}</td>
                                    <td>{cat.name}</td>
                                    <td>{cat.slug}</td>
                                    <td style={{ display: 'flex', gap: '0.5rem' }}>
                                        <form action={deleteBlogCategory.bind(null, cat.id)}>
                                            <button className={`${styles.btn} ${styles.danger}`}>حذف</button>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                            {categories.length === 0 && (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: 'center', padding: '1rem' }}>
                                        لا توجد تصنيفات مضافة بعد.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
