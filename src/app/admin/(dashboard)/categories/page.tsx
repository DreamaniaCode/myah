export const dynamic = 'force-dynamic';
import { getCategories, createCategory, deleteCategory } from '@/app/actions/categories';

import styles from '../styles.module.css';

export default async function CategoriesPage() {
    const categories = await getCategories();

    return (
        <div dir="rtl">
            <div className={styles.header}>
                <h1 className={styles.title}>إدارة الفئات</h1>
            </div>

            <div style={{ marginBottom: '2rem', padding: '1.5rem', background: 'white', borderRadius: '8px', maxWidth: '600px' }}>
                <h3 style={{ marginBottom: '1rem' }}>➕ إضافة فئة جديدة</h3>
                <form action={createCategory} style={{ display: 'grid', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>الاسم بالإنجليزية</label>
                        <input
                            name="name"
                            placeholder="honey"
                            required
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>الاسم بالعربية</label>
                        <input
                            name="nameAr"
                            placeholder="عسل"
                            required
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>الأيقونة (Emoji)</label>
                        <input
                            name="icon"
                            placeholder="🍯"
                            defaultValue="📦"
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '6px' }}
                        />
                    </div>
                    <button type="submit" className={`${styles.btn} ${styles.primary}`}>
                        إضافة الفئة
                    </button>
                </form>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>الأيقونة</th>
                            <th>الاسم بالعربية</th>
                            <th>الاسم بالإنجليزية</th>
                            <th>الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id}>
                                <td style={{ fontSize: '1.5rem' }}>{category.icon}</td>
                                <td>{category.nameAr}</td>
                                <td>{category.name}</td>
                                <td>
                                    <form action={deleteCategory.bind(null, category.id)} style={{ display: 'inline' }}>
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
