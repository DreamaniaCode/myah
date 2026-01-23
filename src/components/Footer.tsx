import Link from 'next/link';
import styles from './Footer.module.css';

interface FooterProps {
    siteName?: string;
    contactPhone?: string;
    contactEmail?: string;
    contactAddress?: string;
}

export default function Footer({
    siteName = 'أعشاب MYAH',
    contactPhone = '',
    contactEmail = '',
    contactAddress = ''
}: FooterProps) {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.grid}>
                    <div className={styles.column}>
                        <h3>{siteName}</h3>
                        <p>
                            نحيي تراث الأجداد بتقديم أجود أنواع العسل والأعشاب الطبيعية.
                            منتجاتنا عضوية 100% ومختارة بعناية لضمان صحتكم وسلامتكم.
                        </p>
                    </div>

                    <div className={styles.column}>
                        <h3>روابط سريعة</h3>
                        <ul className={styles.links}>
                            <li><Link href="/">الرئيسية</Link></li>
                            <li><Link href="/products">جميع المنتجات</Link></li>
                            <li><Link href="/about">من نحن</Link></li>
                            <li><Link href="/contact">اتصل بنا</Link></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h3>تواصل معنا</h3>
                        <ul className={styles.links}>
                            {contactPhone && <li>الهاتف: {contactPhone}</li>}
                            {contactEmail && <li>البريد: {contactEmail}</li>}
                            {contactAddress && <li>العنوان: {contactAddress}</li>}
                        </ul>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>© {new Date().getFullYear()} {siteName}. جميع الحقوق محفوظة.</p>
                </div>
            </div>
        </footer>
    );
}
