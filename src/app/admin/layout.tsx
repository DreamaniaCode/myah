import Link from 'next/link';
import { logout } from '@/app/actions/auth';
import styles from './styles.module.css';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.adminContainer} dir="rtl">
            <aside className={styles.sidebar}>
                <div className={styles.brand}>لوحة تحكم أعشاب MYAH</div>
                <nav className={styles.nav}>
                    <Link href="/admin/products" className={styles.link}>
                        📦 المنتجات
                    </Link>
                    <Link href="/admin/categories" className={styles.link}>
                        🏷️ الفئات
                    </Link>
                    <Link href="/admin/orders" className={styles.link}>
                        🛒 الطلبات
                    </Link>
                    <Link href="/admin/settings" className={styles.link}>
                        ⚙️ إعدادات الموقع
                    </Link>
                    <hr style={{ border: '1px solid #374151', margin: '1rem 0' }} />
                    <Link href="/" target="_blank" className={styles.link}>
                        🌐 معاينة الموقع
                    </Link>
                    <form action={logout}>
                        <button type="submit" className={styles.logoutBtn}>
                            🚪 تسجيل الخروج
                        </button>
                    </form>
                </nav>
            </aside>
            <main className={styles.content}>
                {children}
            </main>
        </div>
    );
}
