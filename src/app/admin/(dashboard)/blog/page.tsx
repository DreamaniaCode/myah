import { getBlogPosts, deleteBlogPost } from '@/app/actions';
export const dynamic = 'force-dynamic';

import Link from 'next/link';
import styles from '../styles.module.css';

export default async function AdminBlogPage() {
    const posts = await getBlogPosts();

    return (
        <div dir="rtl">
            <div className={styles.header}>
                <h1 className={styles.title}>إدارة المدونة</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Link href="/admin/blog/categories" className={`${styles.btn} ${styles.secondary}`}>
                        📁 إدارة التصنيفات
                    </Link>
                    <Link href="/admin/blog/add" className={`${styles.btn} ${styles.primary}`}>
                        ➕ إضافة مقال جديد
                    </Link>
                </div>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>العنوان</th>
                            <th>التصنيف</th>
                            <th>الحالة</th>
                            <th>تاريخ النشر</th>
                            <th>الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.id}>
                                <td>{post.title}</td>
                                <td>{post.category?.nameAr || post.category?.name || '-'}</td>
                                <td>{post.published ? '✅ منشور' : '❌ مسودة'}</td>
                                <td>{post.createdAt.toLocaleDateString('ar-MA')}</td>
                                <td style={{ display: 'flex', gap: '0.5rem' }}>
                                    <Link href={`/admin/blog/edit/${post.id}`} className={`${styles.btn} ${styles.primary}`}>
                                        تعديل
                                    </Link>
                                    <form action={deleteBlogPost.bind(null, post.id)} style={{ display: 'inline' }}>
                                        <button className={`${styles.btn} ${styles.danger}`}>حذف</button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                        {posts.length === 0 && (
                            <tr>
                                <td colSpan={5} style={{ textAlign: 'center', padding: '1rem' }}>
                                    لا توجد مقالات مضافة بعد.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
